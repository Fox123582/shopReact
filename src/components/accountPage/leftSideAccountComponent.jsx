import React from 'react';
import TableDraw from "../common/tableDraw";
import localStorage from "../../services/localStorage";

function LeftSideAccountComponent({styles}) {
    let person = localStorage.getFromLocalstorage()
    function ifExist (){
        if (person.orders.length > 0){
            return <div className={styles.wrapForLeftSide}>
                <h2>Ordered items</h2>
                <TableDraw cart={false} styles={styles}/>
            </div>
        } else {
            return <div className={styles.wrapForLeftSide}>
                <div className={styles.error}>
                    <p>No orders</p>
                </div>
            </div>
        }
    }

    return (
        ifExist()
    );
}

export default LeftSideAccountComponent;