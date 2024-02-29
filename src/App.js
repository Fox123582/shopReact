import Header from "./components/header/header";
import {Route, Routes} from "react-router-dom";
import LogIn from "./components/loginPage/logIn";
import preventStyles from './common/commonStyles/preventstyles.css'
import MainPage from "./components/mainPage/mainPage";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPerson} from "./store/userSlice";
import local from './services/localStorage'
import MainPageMUI from "./components/mainPageWithMUI/mainPageMUI";
import PrivateRouteForRegisterPage from "./hoc/PrivateRouteForRegisterPage";
import ShoppingCartPage from "./components/shoppingCartPage/shoppingCartPage";
import PrivateRouteForCart from "./hoc/privateRouteForCart";
import AccountPage from "./components/accountPage/accountPage";
import PrivateRouteForAccountPage from "./hoc/privateRouteForAccountPage";

function App() {

    const [isAuth,IsAuthSet] = useState(false)
    const dispatch = useDispatch()
    const person = useSelector(state=>state.userSlice)



    useEffect(()=>{
        IsAuthSet(local.getFromLocalstorage().id ? true : false)
        dispatch(setPerson(local.getFromLocalstorage()))
    },[])

    useEffect(()=>{
        IsAuthSet(local.getFromLocalstorage().id ? true : false)
    },[person])

  return (
    <div className="App">

        <Header person = {person}></Header>
        <Routes>
            <Route path={'/login'} element={
                <PrivateRouteForRegisterPage isAuth={isAuth}>
                    <LogIn/>
                </PrivateRouteForRegisterPage>
            }/>
            <Route path={''} element={<MainPageMUI auth={isAuth}/>}/>
            {/*<Route path={''} element={<MainPage/>}/>*/}
            <Route path={'/shoppingCart'} element={
                <PrivateRouteForCart isAuth={isAuth}>
                    <ShoppingCartPage></ShoppingCartPage>
                </PrivateRouteForCart>
            }/>
            <Route path={'/account'} element={
                <PrivateRouteForAccountPage isAuth={isAuth}>
                    <AccountPage></AccountPage>
                </PrivateRouteForAccountPage>
            }/>
        </Routes>
    </div>
  );
}

export default App;
