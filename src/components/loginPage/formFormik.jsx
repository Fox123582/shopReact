import React, {useContext} from 'react';
import {Formik} from "formik";
import logInPageContext from "../../context/logInPageContext";
import API from "../../services/API";
import localStorage from "../../services/localStorage";
import {setPerson} from "../../store/userSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

function FormFormik({reg = false,styles,changeError,...props}) {
    const {allUsers} = useContext(logInPageContext)
    const nav = useNavigate()
    const dispatch = useDispatch()

    function logIn(elem){
        API.changeStatus(elem).then(res => {
            localStorage.saveToLocalstorage(res.data)
            dispatch(setPerson(res.data))
        })
        nav(-1)
    }
    function createPerson(person){
        const user = {
            name:person.name,
            email:person.email,
            password:person.password,
            status:true
        }
        API.setNewUser(user).then(res => {
            localStorage.saveToLocalstorage(res.data)
            dispatch(setPerson(res.data))
        })
        nav(-1)
    }
    function returnForm(){
        if (reg){
            return <Formik
                initialValues={{ name: '',email: '', password: '' ,verifyPassword: ''}}
                validate={values => {
                    let findUser = allUsers.find(element => element.email === values.email) || []
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required email';
                    }
                    else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    else if(reg && findUser.id){
                        errors.email =  `User ${values.email} Already Exist`
                    }
                    else if(values.password !== values.verifyPassword){
                        errors.password = 'Password dont matches'
                    }
                    else if(!values.password){
                        errors.password = 'Required password'
                    }
                    else if(reg && !values.name){
                        errors.name = 'Required name'
                    }
                    return errors;
                }}
                onSubmit={(values, {setSubmitting }) => {
                    createPerson(values)
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form {...props} onSubmit={handleSubmit}>
                        <input
                            placeholder='Enter name'
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                        />
                        <input
                            placeholder='Enter email'
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />
                        <input
                            placeholder='Enter password'
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        <input
                            placeholder='Verify password'
                            type="password"
                            name="verifyPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.verifyPassword}
                        />
                        <button onClick={() => {
                            handleSubmit();
                            changeError(errors,errors.status = false)
                        }} className={styles.but} type="submit" disabled={isSubmitting}>
                            Create Account
                        </button>
                    </form>
                )}
            </Formik>

        } else if (!reg){
            return (
                <Formik
                    initialValues={{email: '', password: ''}}
                    validate={values => {
                        let findUser = allUsers.find(element => element.email === values.email) || []
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required email';
                        }
                        else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        else if(!findUser.id){
                            errors.email = 'User Dont found'
                        }
                        else if(findUser.password !== values.password){
                            errors.password = 'Incorrect password'
                        }
                        return errors;
                    }}
                    onSubmit={(values, {setSubmitting }) => {
                        let findUser = allUsers.find(element => element.email === values.email) || []
                        logIn(findUser)
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <form {...props} onSubmit={handleSubmit}>
                            <input
                                placeholder='Enter email'
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            <input
                                placeholder='Enter password'
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            <button onClick={() => {
                                handleSubmit();
                                changeError(errors,errors.status = false)
                            }} className={styles.but} type="submit" disabled={isSubmitting}>
                                Sign In
                            </button>
                        </form>
                    )}
                </Formik>
            )
        }


    }

    return (
        <>
            {returnForm()}
        </>
    );
}

export default FormFormik;