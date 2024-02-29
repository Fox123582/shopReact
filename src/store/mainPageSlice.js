import {createSlice} from "@reduxjs/toolkit";

const mainPageSlice = createSlice({
    name:'mainPage',
    initialState:{
        products:[]
    },
    reducers:{
        setProducts:(state, action)=> {state.products = action.payload}
    }
})

export default mainPageSlice.reducer

export const {setProducts} = mainPageSlice.actions