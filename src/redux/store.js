import {configureStore} from "@reduxjs/toolkit";
import imageSlice from "./features/Images/imageSlice";
import pageSlice from "./features/Images/pageSlice";
import querySlice from "./features/Images/querySlice";
import totalpagesSlice from "./features/Images/totalpagesSlice";
import colorModeSlice from "./features/colorMode/colorModeSlice";
import { imagesApi } from "./services/searchImage";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer : {
        images : imageSlice,
        page : pageSlice,
        query: querySlice,
        totalpages: totalpagesSlice,
        mode:colorModeSlice,
        [imagesApi.reducerPath] : imagesApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(imagesApi.middleware),
})

setupListeners(store.dispatch)