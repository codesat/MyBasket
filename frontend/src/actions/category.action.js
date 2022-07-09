
import axiosInstance from "../helpers/axios";
import { categoryconstants } from "./constants";

export const getallcategory=()=>{
    return async(dispatch)=>{

        dispatch({type:categoryconstants.GETALLCATEGORYREQUEST})
        const res=await axiosInstance.get("/categories");

        if(res.status===200){
            const {categorylist}=res.data;

            dispatch({
                type:categoryconstants.GETALLCATEGORYSUCCESS,
                payload:{categories:categorylist}
            })
        }else{
          dispatch({
            type:categoryconstants.GETALLCATEGORYFAILURE,
            payload:{
                error:res.data.error
            }
          })
        }


    }
}
