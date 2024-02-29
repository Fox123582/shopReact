import React, { useEffect, useState} from 'react';
import Button from "../common/button";
import cart from '../../common/images/shopping-cart.png'
import localStorage from "../../services/localStorage";
import {useNavigate} from "react-router-dom";
import API from "../../services/API";
import {useDispatch} from "react-redux";
import { setPerson} from "../../store/userSlice";


function SectionGood({ styles,elem,...props}) {
    let [clickButState,setClickButState] = useState(false)
    let person = localStorage.getFromLocalstorage()

    const nav = useNavigate()
    const dispatch = useDispatch()


    useEffect(()=>{
            if (person.id){
                person.shoppingCart.forEach(el => {
                    if (el.id === elem.id){
                        setClickButState(true)
                    }
                })
            }
    },[])
    function addAndDelete(){
        if (clickButState){
            person.shoppingCart.forEach((el,i) => {
                if (el.id === elem.id){
                    person.shoppingCart.splice(i,1)
                }
            })
            localStorage.saveToLocalstorage(person)
            API.changeAllData(person)
            dispatch(setPerson(person))
            setClickButState(!clickButState)
        } else {
            const createGood = {
                id:elem.id,
                count:1
            }
            person.shoppingCart.push(createGood)
            localStorage.saveToLocalstorage(person)
            API.changeAllData(person)
            dispatch(setPerson(person))
            setClickButState(!clickButState)
        }
    }

    function handleClick(){
        if (person.id){
            addAndDelete()
        } else {
            nav('/login')
        }

    }

    function countPriceWithSale(){
        if (elem.sale){
            let priceWithSale  = elem.price - (elem.price/100*elem.salePercent)
            return Math.round(priceWithSale)
        } else return Math.round(elem.price)
    }
    function saleIs(){
        if (elem.sale){
            return  <div className={styles.wrapForDiscount}>
                        <div className={styles.pastPrice}>{elem.price}$</div>
                        <div className={styles.percent}>-{elem.salePercent}%</div>
                    </div>
        } else {
            return <div className={styles.wrapForDiscount}>
                <div className={styles.pastPrice}></div>
                <div style={{backgroundColor:"white"}} className={styles.percent}></div>
            </div>
        }
    }



    return (
        <section {...props} className={styles.category__container}>
            <img src={require(`../../common/images/products/${elem.img.toLowerCase()}.png`)} alt={elem.title}/>
            <div className={styles.name}>{elem.title}</div>
            {saleIs()}
            <div className={styles.price}>{countPriceWithSale()}$</div>
            <Button onClick={handleClick} className={clickButState ? `${styles.activeBut} ${styles.butForBuy}` : `${styles.butForBuy}`}>
                <img src={cart} alt={'shoppingCart'}/>
            </Button>
        </section>
    );
}

export default SectionGood;