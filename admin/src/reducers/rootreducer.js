import { combineReducers } from "@reduxjs/toolkit";
import authreducer from "./authreducer";
import userreducer from './user.reducers';
import productreducer from './product.reducer'
import orderreducer from './order.reducer'
import categoryreducer from './category.reducer'
import pagereducer from './pagereducer'


const rootreducer=combineReducers({
    auth:authreducer,
    user:userreducer,
    category:categoryreducer,
    product:productreducer,
    order:orderreducer,
    page:pagereducer
});

export default rootreducer