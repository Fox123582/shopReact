import React, {useContext, useEffect, useState} from 'react';
import LeftSideLog from "./leftSideLog";
import styles from './style.module.css'
import RightSideLog from "./rightSideLog";
import API from "../../services/API";
import LogInPageContext from "../../context/logInPageContext";
import localStorage from "../../services/localStorage";
import {useNavigate} from "react-router-dom";
import appContext from "../../context/appContext";
import {useDispatch, useSelector} from "react-redux";
import {setPerson} from "../../store/userSlice";

function LogIn(props) {
    // const nav = useNavigate()
    // const dispatch = useDispatch()
    //const person = useSelector(state=>state.userSlice)

    let [allUsers,setAllUsers] = useState([])
    // function changeStatus(elem){
    //     API.changeStatus(elem).then(res => {
    //         localStorage.saveToLocalstorage(res.data)
    //         dispatch(setPerson(res.data))
    //     })
    //
    //     nav(-1)
    //
    // }

    // function createPerson(person){
    //     const user={
    //         name:person.name,
    //         email:person.email,
    //         password:person.password,
    //         status:true
    //     }
    //     API.setNewUser(user).then(res => {
    //         localStorage.saveToLocalstorage(res.data)
    //         dispatch(setPerson(res.data))
    //     })
    //     nav(-1)
    // }
    // function clickButToSignIn(toCheckUser,reg = false){
    //
    //     let findUser = allUsers.find(element => element.email === toCheckUser.email) || []
    //     let error
    //
    //     if(toCheckUser.password === '' || toCheckUser.email === ''){
    //         error = {
    //             status: false,
    //             description:'Not all fields are field'
    //         }
    //         return error
    //     }
    //     if(findUser.email && reg){
    //         error = {
    //             status:false,
    //             description:'Email already exist'
    //         }
    //         return error
    //     }
    //     if (findUser.length === 0 && !reg){
    //         error = {
    //             status:false,
    //             description:'Invalid email'
    //         }
    //         return error
    //     }
    //     if (!reg &&findUser && findUser.password !== toCheckUser.password){
    //         error = {
    //             status:false,
    //             description:'Invalid password'
    //         }
    //         return error
    //     }
    //     if (toCheckUser.password !== toCheckUser.verify && reg){
    //         error = {
    //             status:false,
    //             description:'Password dont match'
    //         }
    //         return error
    //     }
    //     if (!reg){
    //         changeStatus(findUser)
    //         return error = {
    //             status:true
    //         }
    //     } else if (reg){
    //         createPerson(toCheckUser)
    //         return error = {
    //             status:true
    //         }
    //     }
    //
    //
    // }


    useEffect(()=>{
        API.getUsers().then(res => setAllUsers(res.data))
    },[])


    return (
        <LogInPageContext.Provider value={{allUsers}}>
            <div className={styles.wrapForForms}>
                <LeftSideLog styles={styles} className={styles.wrapForLeftForm}></LeftSideLog>
                <RightSideLog styles={styles} className={styles.wrapForRightForm}></RightSideLog>
            </div>
        </LogInPageContext.Provider>
    );
}

export default LogIn;