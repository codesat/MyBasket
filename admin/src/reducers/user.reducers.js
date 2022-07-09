import { userconstants } from "../actions/constants"


const initstate={
    error:null,
    message:"",
    loading:false

}

export default (state=initstate,action)=>{
    switch(action.type){
        case userconstants.USERREGREQUEST:
                state={
                    ...state,
                    laoding:true

                }
            break;

         case userconstants.USERREGSUCCESS:
                state={
                    ...state,
                    laoding:false,
                    message:action.payload.message

                }
            break;

        case userconstants.USERREGFAILURE:
                state={
                    ...state,
                    loading:false,
                    error:action.payload.error

                }
            break;

    }
    return state
}