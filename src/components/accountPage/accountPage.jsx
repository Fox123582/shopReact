import React from 'react';
import styles from "./style.module.css";
import LeftSideAccountComponent from "./leftSideAccountComponent";
import RightSideAccountComponent from "./rightSideAccountComponent";

function AccountPage() {
    return (
        <div className={styles.wrapForAccount}>
            <LeftSideAccountComponent styles={styles}></LeftSideAccountComponent>
            <RightSideAccountComponent styles={styles}></RightSideAccountComponent>
        </div>
    );
}

export default AccountPage;