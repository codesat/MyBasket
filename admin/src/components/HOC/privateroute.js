import React from 'react'
import { Route ,Navigate} from 'react-router-dom'

//here we will allow only logged in user to visit respective pages
// like home page
const Privateroute = ({element:element ,...restprops}) => {
  return (
    <Route {...restprops} element={(props)=>{

      //we will verify the user
      const token=window.localStorage.getItem("token");

      if(token){
        return <element {...props}/>
      }
      else{
        return <Navigate to={"/signin"}/>
      }

    }}/>
  )
}

export default Privateroute
