import React, { useEffect, useState} from 'react';

import styles from './style.module.css'
import cart from '../../common/images/shopping-cart.png'
import localStorage from "../../services/localStorage";
import {useNavigate} from "react-router-dom";
import API from "../../services/API";
import {useDispatch} from "react-redux";
import { setPerson} from "../../store/userSlice";
import {Box,Button} from "@mui/material";

function SectionGoodsMui({ elem,...props}) {
    let [clickButStateMui,setClickButStateMui] = useState(false)
    let person = localStorage.getFromLocalstorage()

    const nav = useNavigate()
    const dispatch = useDispatch()


    useEffect(()=>{
        if (person.id){
            person.shoppingCart.forEach(el => {
                if (el.id === elem.id){
                    setClickButStateMui(true)
                }
            })
        }
    },[])
    function addAndDelete(){
        if (clickButStateMui){
            person.shoppingCart.forEach((el,i) => {
                if (el.id === elem.id){
                    person.shoppingCart.splice(i,1)
                }
            })
            localStorage.saveToLocalstorage(person)
            API.changeAllData(person)
            dispatch(setPerson(person))
            setClickButStateMui(!clickButStateMui)
        } else {
            const createGood = {
                id:elem.id,
                count:1
            }
            person.shoppingCart.push(createGood)
            localStorage.saveToLocalstorage(person)
            API.changeAllData(person)
            dispatch(setPerson(person))
            setClickButStateMui(!clickButStateMui)
        }
    }

    function handleClick(){
        if (person.id){
            addAndDelete()
        } else {
            nav('/login')
        }

    }

    function countPriceWithSale(){
        if (elem.sale){
            let priceWithSale  = elem.price - (elem.price/100*elem.salePercent)
            return Math.round(priceWithSale)
        } else return Math.round(elem.price)
    }
    function saleIs(){
        if (elem.sale){
            return  <Box className={styles.wrapForDiscount}>
                <Box className={styles.pastPrice}>{elem.price}$</Box>
                <Box className={styles.percent}>-{elem.salePercent}%</Box>
            </Box>
        } else {
            return <Box className={styles.wrapForDiscount}>
                <Box className={styles.pastPrice}></Box>
                <Box style={{backgroundColor:"white"}} className={styles.percent}></Box>
            </Box>
        }
    }



    return (
        <Box component={'section'} {...props} className={styles.category__container}>
            <img src={require(`../../common/images/products/${elem.img.toLowerCase()}.png`)} alt={elem.title}/>
            <Box sx={{
                fontWeight: 'bold',
                color: 'black'
            }
            }>{elem.title}</Box>
            {saleIs()}
            <Box className={styles.price}>{countPriceWithSale()}$</Box>
            <Button variant="contained"  className={styles.butForBuy}
            sx={{
                position:'absolute',
                    bottom: 15,
                    right: 10,
                    width:50,
                bgcolor:clickButStateMui ? 'green' : 'red',
                '&:hover':{
                    bgcolor:clickButStateMui ? 'success.main' : 'error.main'
                },
                }}
             onClick={handleClick} >
                <img src={cart} alt={'shoppingCart'}/>
            </Button>
        </Box>)
}

export default SectionGoodsMui;