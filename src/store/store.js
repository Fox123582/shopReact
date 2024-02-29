import {configureStore} from "@reduxjs/toolkit";
import mainPageSlice from "./mainPageSlice.js";
import userSlice from "./userSlice.js";

const rootReducer = {
    mainPageSlice: mainPageSlice,
    userSlice:userSlice,
}

export default configureStore({
    reducer:rootReducer
})