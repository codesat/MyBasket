import axiosInstance from "../helpers/axios"
import { pageconstants } from "./constants"

export const createpage=(formdata)=>{
    return async dispatch=>{
        try{
            const res=await axiosInstance.post("/page/create",formdata);
            if(res.status==200){
                console.log(res.data)
                dispatch({
                    type:pageconstants.CREATEPAGESUCCESS,
                    payload:{page:res.data.page}
                })
            }else{
                dispatch({
                    type:pageconstants.CREATEPAGEFAILURE,
                    payload:{error:res.data.error}
                })


            }
        }catch(err){
            console.log(err);
        }
    }

}