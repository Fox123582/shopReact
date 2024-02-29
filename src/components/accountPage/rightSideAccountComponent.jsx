import React from 'react';
import Button from "../common/button";
import localStorage from "../../services/localStorage";
import API from "../../services/API";
import {resetPerson} from "../../store/userSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function RightSideAccountComponent({styles}) {
    let dispatch = useDispatch()
    let person = localStorage.getFromLocalstorage()
    let nav = useNavigate()

    function deleteAccount(){
        API.deleteAccount(person)
        localStorage.resetLocalStorage()
        dispatch(resetPerson([]))
        nav('/')
    }

    return (
        <div className={styles.wrapForRightSide}>
            <h2>Account info</h2>
            <div className={styles.wrapForAccountName}>
                <p>Name:</p>
                <p className={styles.accountName}>{person.name}</p>
            </div>
            <div className={styles.wrapForEmail}>
                <p>Email:</p>
                <p className={styles.accountEmail}>{person.email}</p>
            </div>
            <div className={styles.wrapForButtonDeleteAcc}>
                <Button onClick={deleteAccount} className={styles.deleteAccount}>Delete Account</Button>
            </div>
        </div>
    );
}

export default RightSideAccountComponent;