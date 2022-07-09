import { productconstants } from "../actions/constants";


const initialstate={
products:[]

}

export default (state=initialstate,action)=>{

    switch(action.type){
        case productconstants.GETALLPRODUCTSUCCESS:
            state={
                ...state,
                products:action.payload.allproducts
            }

            break;

    }
    // console.log(state)
    return state;
}