import axiosInstance from "../helpers/axios"
import { categoryconstants, initialdataconstants, productconstants } from "./constants"

export const getinitialdata=()=>{

    return async (dispatch)=>{
        const res=await axiosInstance.post("/initial/initialdata");
        if(res.status===200){
            const {categories,allproducts}=res.data;
            // console.log(allcategories) OK

            dispatch({
                type:categoryconstants.GETALLCATEGORYSUCCESS,
                payload:{categories}
                });

                dispatch({
                    type:productconstants.GETALLPRODUCTSUCCESS,
                    payload:{allproducts}
                });
        }else{
           console.log("no data found")
        }
    }
}