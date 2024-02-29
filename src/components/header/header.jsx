import React, { useEffect, useState} from 'react';
import imageLogo from '../../common/images/logo.png'
import imageCart from '../../common/images/shopping-cart.png'
import styles from './style.module.css'
import {useNavigate} from "react-router-dom";
import localStorage from "../../services/localStorage";
import API from "../../services/API";
import {useDispatch, useSelector} from "react-redux";
import {setPerson} from "../../store/userSlice";

function Header({person}) {
    let [counter,setCounter] = useState(0)
    const nav = useNavigate()
    const dispatch = useDispatch()
    const personFromStore = useSelector(state => state.userSlice)
    function isLogin(){
        if (person.id){
            return <a onClick={()=>nav('/account')} className={styles.logIn}>
                        {person.name}
                    </a>
        } else {
            return <a onClick={()=>nav('/login')} className={styles.logIn}>
                        Log in
                    </a>
        }
    }
    function uiLogOut(){
        if (person.id){
            return <a onClick={logOutFromSite} className={styles.logOut}>Log out</a>
        }
    }

    function logOutFromSite(){
        let person = localStorage.getFromLocalstorage()
        API.changeStatus(person)
        localStorage.resetLocalStorage()
        setCounter(0)
        dispatch(setPerson([]))
        nav('')
    }

    useEffect(()=>{
        let person = localStorage.getFromLocalstorage()
        if (person.id){
            setCounter(person.shoppingCart.length)
        }
    },[])

    useEffect(()=>{
        let person = localStorage.getFromLocalstorage()
        if (person.id){
            setCounter(person.shoppingCart.length)
        }
    },[personFromStore])





    return (
        <header>
            <div className={styles.wrapForLogo}>
                <a><img onClick={()=>nav('')} className={styles.logo} src={`${imageLogo}`} alt={'logo'}/></a>
            </div>
            <div className={styles.wrapForRegistration}>
                <p>
                    Hi,
                    {isLogin()}
                </p>
                <div className={styles.wrapperForCartAndCounter}>
                    <a ><img onClick={()=>nav('/shoppingCart')} src={`${imageCart}`} alt={'cart'}/></a>
                    <div className={styles.countProducts}>{counter}</div>
                </div>
                {uiLogOut()}
            </div>
        </header>
    );
}

export default Header;