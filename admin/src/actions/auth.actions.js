import axios from "../helpers/axios";
import { authconstants } from "./constants"

export const login=(user)=>{

    // console.log(user);


    return async(dispatch)=>{

        dispatch({type:authconstants.LOGINREQUEST});

        const res=await axios.post("/admin/signin",{
                ...user
        });

        if(res.status===200){
            const {token,user}=res.data;
            // console.log(token+" "+user)
            localStorage.setItem("token",token);
            localStorage.setItem("user",JSON.stringify(user));
            dispatch({
                type:authconstants.LOGINSUCCESS,
                payload:{
                    token,user
                }
            });

        }else{
            if(res.status===400){
                dispatch({
                    type:authconstants.LOGINFAILURE,
                    payload:{error:res.data.error}
                })

            }
        }

    }
}



export const isuserloggedin=()=>{

    return async (dispatch)=>{
        const token=localStorage.getItem("token");

        if(token){
            const user=JSON.parse(localStorage.getItem("user"));

            dispatch({
                type:authconstants.LOGINSUCCESS,
                payload:{token,user}
            })
        }else{
            dispatch({
                type:authconstants.LOGINFAILURE,
                payload:{

                    error:"User needs to be login"
                }
            })
        }
    }
}

export const signout=()=>{
    return async dispatch=>{


        dispatch({type:authconstants.LOGOUTREQUEST})

        const res=await axios.post("/admin/signout");

        if(res.status===200){
            localStorage.clear();
            dispatch({
                type:authconstants.LOGOUTSUCCESS
            });

        }else{
            dispatch({
                type:authconstants.LOGOUTFAILURE,
                payload:{error:res.data.error}
            });

        }
    }
}