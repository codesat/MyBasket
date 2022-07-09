import { pageconstants } from "../actions/constants"

const initstate={
    error:null,
    loading:false,
    page:{}
}

export default (state=initstate,action)=>{
    // console.log(action.type)
    switch(action.type){
        case pageconstants.CREATEPAGEREQUEST:
            state={
                ...state,
                loading:true
            }
            break;
        case pageconstants.CREATEPAGESUCCESS:
            state={
                ...state,
                loading:false
            }
            break;
        case pageconstants.CREATEPAGEFAILURE:
            state={
                ...state,
                loading:false,
                error:action.payload.error
            }
            break;
    }
    return state;
}