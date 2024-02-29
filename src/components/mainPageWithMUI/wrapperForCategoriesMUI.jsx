import React, {} from 'react';
import {Box, Typography} from "@mui/material";
import SectionGoodsMUI from "./sectionGoodsMUI";
import {nanoid} from "nanoid";

function WrapperForCategoriesMui({styles,products,elem,...props}) {
    let productsFromCategoryMui = []
    selectCategory()
    function selectCategory(){
        products.forEach(el => {
            if (el.category === elem){
                productsFromCategoryMui.push(el)
            }

        })
    }
    return (
        <Box {...props}>
            <Typography sx={{fontWeight:'bold',fontSize: 24}} component={'h2'}>{elem}</Typography>
            {productsFromCategoryMui.map(elem => <SectionGoodsMUI  styles ={styles} elem={elem} key={nanoid()}></SectionGoodsMUI>)}
        </Box>
    );
}

export default WrapperForCategoriesMui ;