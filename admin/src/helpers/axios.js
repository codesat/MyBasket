import axios from "axios";
import { authconstants } from "../actions/constants";
import { api } from "../urlconfig";
import store from '../store/store'


const token=window.localStorage.getItem("token");

const axiosInstance=axios.create({
    baseURL:api,
    headers:{
        "Authorization": token ? `Bearer ${token}` :""
    }
});

axiosInstance.interceptors.request.use((req)=>{
    const {auth}=store.getState();
    if(auth.token){
        req.headers.Authorization=`Bearer ${auth.token}`;
    }
    return req;
})
axiosInstance.interceptors.request.use((res)=>{
    return res;
},(error)=>{
    console.log(error);
    const {status}=error.response;
    if(status>=400){
        localStorage.clear();
        store.dispatch({
            type:authconstants.LOGOUTSUCCESS
        })
    }
    return Promise.reject(error)
})


export default axiosInstance;