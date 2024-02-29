import React from 'react';
import DrawRowsForTable from "./drawRowsForTable";
import {nanoid} from "nanoid";
import localStorage from "../../services/localStorage";

function TableDraw({cart = true,styles}) {
    let person = localStorage.getFromLocalstorage()
    function whatDisplay(){
        if (cart){
            return person.shoppingCart.map(el => <DrawRowsForTable cart={cart} key={nanoid()} element={el} styles={styles}></DrawRowsForTable>)
        } else {
            return person.orders.map(el => <DrawRowsForTable cart={cart} key={nanoid()} element={el} styles={styles}></DrawRowsForTable>)
        }
    }
    function checkLocation(){
        if (cart){
            return <th>Action</th>
        } else {
            return null
        }
    }
    return (
        <table>
            <thead>
            <tr>
                <th>Description</th>
                <th>Price</th>
                <th>Sale</th>
                <th>Quantity</th>
                <th>Total</th>
                {checkLocation()}

            </tr>
            </thead>
            <tbody>
            {whatDisplay()}

            </tbody>
        </table>
    );
}

export default TableDraw;