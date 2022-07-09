import { combineReducers } from "@reduxjs/toolkit";
import categoryreducer from './category.reducer'
import productreducer from './product.reducer'

const rootreducer=combineReducers({
    category:categoryreducer,
    product:productreducer
});

export default rootreducer