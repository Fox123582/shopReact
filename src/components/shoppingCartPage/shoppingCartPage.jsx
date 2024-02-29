import React  from 'react';
import LeftSideCartComponent from "./leftSideCartComponent";
import styles from './style.module.css'
import RightSideCartComponent from "./rightSideCartComponent";

function ShoppingCartPage() {

    return (
        <div className={styles.wrapForShoppingCart}>
            <LeftSideCartComponent styles={styles}></LeftSideCartComponent>
            <RightSideCartComponent styles={styles}></RightSideCartComponent>
        </div>
    );
}

export default ShoppingCartPage;