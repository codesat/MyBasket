import { authconstants, userconstants } from "../actions/constants"

const initialstate={
    token:null,
    user:{
        fname:"",
        lname:"",
        email:"",
        pic:"",
}
,
authenticate:false,
authenticating:false,
loading:false,
error:null,
message:""
}


export default (state=initialstate,action)=>{


    // console.log(action);

    switch(action.type){
        case authconstants.LOGINREQUEST:
            state={
                ...state,
                authenticating:true
            }

            break;
        case authconstants.LOGINSUCCESS:
            state={
                ...state,
                user:action.payload.user,
                token:action.payload.token,
                authenticate:true,
                authenticating:false
            }
            break;

        case authconstants.LOGOUTREQUEST:
            state={
                ...state,
               loading:true
            }
            break;

        case authconstants.LOGOUTSUCCESS:
            state={
                ...initialstate,
            }
            break;

        case authconstants.LOGOUTFAILURE:
                state={
                    ...state,
                    error:action.payload.error,
                    loading:false

                }
                break;

    }

    return state;

}