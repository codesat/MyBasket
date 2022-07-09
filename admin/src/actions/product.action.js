import axiosInstance from "../helpers/axios"

export const addproduct=(formdata)=>{
    return async (dispatch)=>{
        const res=await axiosInstance.post("/product/create",formdata);
        if(res.status===200){
            console.log(res);
        }
    }
}