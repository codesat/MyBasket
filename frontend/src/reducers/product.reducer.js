import { productconstants } from "../actions/constants"

const initialstate={
    products:[],
    productsbyprice:{
        under5k:[],
        under10k:[],
        under15k:[],
        under20k:[],
        under30k:[],
    },
    pagerequest:false,
    page:{},
    error:null
}

export default(state=initialstate,action)=>{

        switch(action.type){
            case productconstants.GETPRODUCTSUCCESS:
                state={
                    ...state,
                    products:action.payload.products,
                    productsbyprice:{
                        ...action.payload.productsbyprice
                    }
                }
                break;
            case productconstants.GETPRODPAGEREQUEST:
                state={
                    ...state,
                    pagerequest:true

                    }

                break;
            case productconstants.GETPRODPAGESUCCESS:
                state={
                    ...state,
                    page:action.payload.page,
                    pagerequest:false

                    }

                break;
            case productconstants.GETPRODPAGEFAILURE:
                state={
                    ...state,
                    pagerequest:false,
                    error:action.payload.error
                    }
                break;
        }

        return state;

}