import React, {useEffect} from 'react';
import WrapperForCategories from "./wrapperForCategories";
import API from "../../services/API";
import {nanoid} from "nanoid";
import styles from './style.module.css'
import {useDispatch, useSelector} from "react-redux";
import {setProducts} from "../../store/mainPageSlice";

function MainPage() {
    let categories = []

    const dispatch = useDispatch()
    const products = useSelector(state => state.mainPageSlice.products)


    useEffect(()=>{
        API.getGoods().then(res =>dispatch(setProducts(res.data)))
    },[])


    getCategories()
    function getCategories (){
        products.forEach(el => {
            categories.push(el.category)
        })
        categories = new Set(categories)
        categories = [...categories]

    }

    return (
        <div className={styles.wrapForContent}>
            {categories.length > 0 ? categories.map(elem=> <WrapperForCategories products={products} styles={styles} className = {styles.wrapForCategories} elem={elem} key={nanoid()}></WrapperForCategories>) : <></>}
        </div>
    );
}

export default MainPage;