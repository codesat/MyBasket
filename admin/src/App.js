import Layout from './components/Layout/index';
import './App.css';
import {Navigate, Route,Routes} from 'react-router-dom'
import Home from './containers/Home/Home';
import Signup from './containers/Signup';
import Signin from './containers/Signin';
import Privateroute from './components/HOC/privateroute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isuserloggedin } from './actions/auth.actions';
import Products from './containers/Products/products';
import Orders from './containers/Orders/orders';
import Category from './containers/Category/Category';
import { getallcategory } from './actions/category.action';
import { getinitialdata } from './actions/initialdata.action';
import Page from './containers/Newpage/Page';


function App() {

    const auth=useSelector(state=>state.auth);
    const dispatch=useDispatch();

    const token=window.localStorage.getItem("token");
    // const token=true;

   useEffect(()=>{
    if(!auth.authenticate){
      dispatch(isuserloggedin());

    }
    if(auth.authenticate){
      dispatch(getinitialdata());
    }
    //just in single go we ahve our all categories
    // dispatch(getallcategory());
  },[auth.authenticate]);


  return (
    <div className="App">

     <Routes>
     <Route path="/" exact element={token?<Home/>:<Navigate to="/signin"/>}/>
     <Route path="/products" exact element={token?<Products/>:<Navigate to="/signin"/>}/>
     <Route path="/orders" exact element={token?<Orders/>:<Navigate to="/signin"/>}/>
     <Route path="/category" exact element={token?<Category/>:<Navigate to="/signin"/>}/>
     <Route path="/page" exact element={token?<Page/>:<Navigate to="/signin"/>}/>
     {/* <Privateroute path="/" exact element={<Home/>} /> */}
     {/* <Route path="/products" exact element={<Products/>} /> */}
     {/* <Route path="/orders" exact element={<Orders/>} /> */}

     <Route path="/signin" exact element={<Signin/>} />
     <Route path="/signup" exact element={<Signup/>} />
     </Routes>


    </div>
  );
}

export default App;
