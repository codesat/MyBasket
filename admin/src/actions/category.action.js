import axiosInstance from "../helpers/axios";
import { categoryconstants } from "./constants";

 const getallcategory=()=>{
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

export const addcategory=(formdata)=>{
    return async(dispatch)=>{
        dispatch({type:categoryconstants.ADDNEWCATEGORYREQUEST});
        try{
            const res=await axiosInstance.post("/category/create",formdata);
            console.log(formdata);
            if(res.status==200){
                dispatch({
                    type:categoryconstants.ADDNEWCATEGORYSUCCESS,
                    payload:{category:res.data.category}
                })
                console.log(res.data.category);
            }else{
                dispatch({
                    type:categoryconstants.ADDNEWCATEGORYFAILURE,
                    payload:res.data.error
                })
            }
        }catch(err){
            console.log(err.response)
        }
    }
}

export const updatecategory=(form)=>{
    return async(dispatch)=>{
        dispatch({type:categoryconstants.UPDATECATEGORIESREQUEST})
    const res=await axiosInstance.post("/categories/update",form);
    if(res.status==200){
        dispatch({type:categoryconstants.UPDATECATEGORIESSUCCESS});
        dispatch(getallcategory());
    }else{
        const {error}=res.data;
        dispatch({
            type:categoryconstants.UPDATECATEGORIESFAILURE,
            payload:{error}
        })
    }

}

}

export const deletemycategory=(ids)=>{
    console.log(ids)
    return async(dispatch)=>{

        dispatch({type:categoryconstants.DELETECATEGORIESREQUEST});
        const res=await axiosInstance.delete("/categories/delete",{
            payload:{
                ids
            }
        });

        if(res.status==200){
            console.log(res.data)
            dispatch(getallcategory());
            dispatch({
                type:categoryconstants.DELETECATEGORIESSUCCESS
            })

        }
        else{
            const {error}=res.data;
            dispatch({
                type:categoryconstants.DELETECATEGORIESFAILURE,
                payload:{error}
              })
        }
    }
}

export default getallcategory;