import React, {memo, useEffect} from 'react';
import API from "../../services/API";
import {nanoid} from "nanoid";
import styles from './style.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setProducts} from "../../store/mainPageSlice";
import {Box} from "@mui/material";
import WrapperForCategoriesMui from "./wrapperForCategoriesMUI";
function MainPageMui(props) {
    let categoriesMuiPage = []

    const dispatch = useDispatch()
    const products = useSelector(state => state.mainPageSlice.products)


    useEffect(()=>{
        API.getGoods().then(res =>dispatch(setProducts(res.data)))
    },[])


    getCategories()
    function getCategories (){
        products.forEach(el => {
            categoriesMuiPage.push(el.category)
        })
        categoriesMuiPage = new Set(categoriesMuiPage)
        categoriesMuiPage = [...categoriesMuiPage]

    }
    return (
        <Box className={styles.wrapForContent}>
            {categoriesMuiPage.length > 0 ? categoriesMuiPage.map(elem=> <WrapperForCategoriesMui products={products} styles={styles} className = {styles.wrapForCategories} elem={elem} key={nanoid()}></WrapperForCategoriesMui>) : <></>}
        </Box>
    );
}

export default MainPageMui = memo(MainPageMui);