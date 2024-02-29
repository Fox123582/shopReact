import React from 'react';
import Button from "../common/button";
import localStorage from "../../services/localStorage";
import {useDispatch, useSelector} from "react-redux";
import {countPriceWithSale} from "../common/countPriceWithSale";
import API from "../../services/API";
import {setPerson} from "../../store/userSlice";

function RightSideCartComponent({styles}) {
    let person = localStorage.getFromLocalstorage()
    let getItems = useSelector(state => state.mainPageSlice.products)
    let dispatch = useDispatch()

    function totalPriceOrder(){
        let total = 0

        person.shoppingCart.forEach(el=>{
           getItems.forEach(element=>{
               if (element.id === el.id ){
                   total = total + countPriceWithSale(element) * el.count
               }
           })
        })
        return total
    }

    function completeOrder(){
        if (person.shoppingCart.length > 0){
            person.shoppingCart.forEach(el =>{
                person.orders.push(el)
            })
            person.shoppingCart.length = 0
            API.changeAllData(person).then(res => {
                localStorage.saveToLocalstorage(res.data)
                dispatch(setPerson(res.data))
            })

        } else {
            return false
        }
    }

    return (
        <div className={styles.wrapForRightSide}>
            <h2>My order summary</h2>
            <div className={styles.wrapForTotalPrice}>
                <p>Order total:</p>
                <p className={styles.totalPrice}>{totalPriceOrder()} $</p>
            </div>
            <div className={styles.wrapForButtonOrder}>
                <Button onClick={completeOrder} className={styles.completeOrder}>Complete order</Button>
            </div>
        </div>
    );
}

export default RightSideCartComponent;