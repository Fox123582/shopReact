import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import localStorage from "../../services/localStorage";
import API from "../../services/API";
import {setPerson} from "../../store/userSlice";

function DrawRowsForTable({cart,styles,element}) {
    let dispatch = useDispatch()
    let getItems = useSelector(state => state.mainPageSlice.products)
    let currentElem = getItems.find(el => el.id === element.id)
    let person = localStorage.getFromLocalstorage()

    const [inputChangeState,setInputChangeState] = useState(element.count)

    function countPriceWithSale(){
        if (currentElem.sale){
            let priceWithSale  = currentElem.price - (currentElem.price/100*currentElem.salePercent)
            return Math.round(priceWithSale)
        } else return Math.round(currentElem.price)
    }
    function countTotalPrice(price){
        return inputChangeState * price
    }

    function changeCount(value){
        person.shoppingCart.forEach(el=>{
            if (el.id === element.id){
                el.count = value
            }
        })
        API.changeAllData(person).then(res => {
            localStorage.saveToLocalstorage(res.data)
            dispatch(setPerson(res.data))
        })
        setInputChangeState(value)
    }

    function clickOnBin(){
        let newCart = person.shoppingCart.filter(el=> el.id !== element.id)

        person.shoppingCart = newCart

        API.changeAllData(person).then(res => {
            localStorage.saveToLocalstorage(res.data)
            dispatch(setPerson(res.data))
        })
    }

    function ifSaleExist(){
        if (currentElem.sale){
            return currentElem.salePercent + '%'
        } else {
            return ''
        }
    }
    function whatPageInputReturn(){
        if (cart){
            return <td><input onInput={event => changeCount(Number(event.target.value))} value={inputChangeState} min={1} type="number"/></td>
        } else {
            return <td>{inputChangeState}</td>
        }

    }
    function whatPageBin(){
        if (cart){
            return <td><img onClick={clickOnBin} className={styles.bin} src={require("../../common/images/delete.png")} alt={"Bin"}/></td>
        } else {
            return null
        }
    }

    return (
        <tr className={styles.trForProduct}>
            <td>
                <div className={styles.nameImg}>
                    <img src={require(`../../common/images/products/${currentElem.img.toLowerCase()}.png`)}  alt={"productImage"}/>
                        <p>{currentElem.title}</p>
                </div>
            </td>
            <td className={styles.priceForOne}>$ {currentElem.price}</td>
            <td className={styles.tableSale}><p>{ifSaleExist()}</p></td>
            {whatPageInputReturn()}
            <td className={styles.total}>$ {countTotalPrice(countPriceWithSale())}</td>
            {whatPageBin()}
        </tr>

    );
}

export default DrawRowsForTable;