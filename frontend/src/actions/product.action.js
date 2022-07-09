import axiosInstance from "../helpers/axios"
import { productconstants } from "./constants";

export const getproductsbyslug=(slug)=>{
    return async(dispatch)=>{
        const res=axiosInstance.get(`/products/${slug}`);
        // console.log(res);

        if(res.status===200){
            dispatch=({
                type:productconstants.GETPRODUCTSUCCESS,
                payload:res.data
            })
        }
    }
}

export const getProductPage=(payload)=>{
    return async(dispatch)=>{
        try{
            dispatch({type:productconstants.GETPRODPAGEREQUEST})
            const {cid,type}=payload.params;
            const res=axiosInstance.get(`/page/${cid}/${type}`);
            // console.log(res);
            if(res.status===200){
                const {page}=res.data;
                dispatch({
                    type:productconstants.GETPRODPAGESUCCESS,
                payload:page})

            }else{
                const {error}= res.data;
                dispatch({
                    type:productconstants.GETPRODPAGEFAILURE,
                payload:{error}})

            }
        }catch(err){
            console.log(err)
        }
    }
}