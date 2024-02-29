import React, {useContext,  useState} from 'react';
import Input from "../common/input";
import Button from "../common/button";
import logInPageContext from "../../context/logInPageContext";

function Form({reg = false,styles,changeError,...props}) {

    let [inputPassword,setInputPassword] = useState('')
    let [inputEmail,setInputEmail] = useState('')
    let [inputVerify,setInputVerify] = useState('')
    let [inputName,setInputName] = useState('')

    const {clickButToSignIn} = useContext(logInPageContext)
    function submitButSignIn (e){
        e.preventDefault()
        const createElem = {
            email:inputName,
            password:inputPassword
        }
        const res = clickButToSignIn(createElem)
        changeError(res)
    }
    function registerBut(e){
        e.preventDefault()
        const elemToCheck = {
            name:inputName,
            email:inputEmail,
            password:inputPassword,
            verify:inputVerify
        }
        const res = clickButToSignIn(elemToCheck,true)
        changeError(res)
    }

    function register(){
        if (reg){
            return <>
                <Input placeholder={'Enter name'} onChange = {(e)=> setInputName(e.target.value)} type={'text'}></Input>
                <Input onChange = {(e)=> setInputEmail(e.target.value)} placeholder={'Enter email'} type={'text'}></Input>
                <Input placeholder={'Enter password'} onChange = {(e)=> setInputPassword(e.target.value)} type={'password'}></Input>
                <Input placeholder={'Verify password'} onChange = {(e)=> setInputVerify(e.target.value)} type={'password'}></Input>
                <Button type={'submit'} onClick={registerBut} className={styles.but}>Create account</Button>
                </>
        } else {
            return <>
                <Input value = {inputName} placeholder={'Enter name'} onChange = {(e)=> setInputName(e.target.value)} type={'text'}></Input>
                <Input value ={inputPassword} placeholder={'Enter password'} onChange = {(e)=> setInputPassword(e.target.value)} type={'password'}></Input>
                <Button type={'submit'} onClick={submitButSignIn} className={styles.but}>Sign in</Button>
            </>
        }
    }
    return (
        <form {...props}>
            {register()}
        </form>
    );
}

export default Form;