import React from 'react';
import { configureStore} from "@reduxjs/toolkit";
import navReducer from "../navSlice/navSlice";

export const store = configureStore({
    reducer: {
        nav: navReducer
    }
});
