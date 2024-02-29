import React from 'react';
import localStorage from "../../services/localStorage";

import TableDraw from "../common/tableDraw";
function LeftSideCartComponent({styles}) {
    let person = localStorage.getFromLocalstorage()



    function ifExist (){
        if (person.shoppingCart.length > 0){
            return <div className={styles.wrapForLeftSide}>
                    <h2>Goods in cart</h2>
                <TableDraw styles={styles}/>
                </div>
        } else {
            return <div className={styles.wrapForLeftSide}>
                <div className={styles.error}>
                    <p>Your cart is empty</p>
                </div>
            </div>
        }
    }


    return (
        <>
            {ifExist()}
        </>
    );
}

export default LeftSideCartComponent;