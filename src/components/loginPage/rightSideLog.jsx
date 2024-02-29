import React, {useState} from 'react';
import ErrorBlock from "../common/errorBlock";
import Form from "./form";
import FormFormik from "./formFormik";

function RightSideLog({styles, ...props}) {
    let [errorReg,setErrorReg] = useState({
        status:true,
        description:''
    })

    function drawError (){

        if (!errorReg.status){
            return <ErrorBlock errors={errorReg} className = {styles.error} ></ErrorBlock>
        }
        return ''
    }

    function changeError(newState){
        setErrorReg(newState)
    }

    return (
        <div {...props}>
            <h2>Quick Registration</h2>
            <p>For new customers</p>
            {drawError()}
            {/*<Form changeError = {changeError} reg={true} className={styles.register} styles = {styles}></Form>*/}
            <FormFormik changeError = {changeError} reg={true} className={styles.register} styles = {styles}></FormFormik>
        </div>
    );
}

export default RightSideLog;