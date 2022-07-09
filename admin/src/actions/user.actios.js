import axios from "../helpers/axios";
import {  userconstants } from "./constants"


 const signupbhai=(user)=>{

    console.log(user);


    return async(dispatch)=>{

        dispatch({type: userconstants.USERREGREQUEST});
        const res=await axios.post("/admin/signup",{
                ...user
        });

        if(res.status===200){
            const {message}=res.data;
            dispatch({
                type:userconstants.USERREGSUCCESS,
                payload:{message}
            });

        }else{
            if(res.status===400){
                dispatch({
                    type:userconstants.USERREGFAILURE,
                    payload:{error:res.data.error}
                })

            }
        }

    }
}


export default signupbhai;