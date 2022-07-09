import React,{useState,useEffect} from "react";
import {useSelector,useDispatch} from 'react-redux'
import { getproductsbyslug } from "../../../actions/product.action";
import './style.css'
import { generatepublicurl } from "../../../urlconfig";


const Productstore = (props) => {


    const dispatch=useDispatch();
    const product=useSelector(state=>state.product);
    const [pricerange,setpricerange]=useState({
        under5k:5000,
        under10k:10000,
        under15k:15000,
        under20k:20000,
        under30k:30000,
    })

    useEffect(()=>{
        // console.log(props);
        const {match}=props;
        dispatch(getproductsbyslug(match.params.slug));

    },[]);


  return (
    <>
      {Object.keys(product.productsbyprice).map((key, index) => {
        <div className="card">
          <div className="cardheader">
            <div>
              {props.match.params.slug} mobile under {pricerange[key]}
            </div>
            <button>view all</button>
          </div>

          <div style={{ display: "flex" }}>
            {product.productsbyprice[key].map((product) => (
              <div className="productcontainer">
                <div className="productimgcontainer">
                  <img
                    src={generatepublicurl(product.productpictures[0].img)}
                    alt=""
                  />
                </div>
                <div className="productinfo">
                  <div style={{ margin: "5px 0" }}>{product.name}</div>
                  <div>
                    <span>4.3</span>
                    <span>3535</span>
                  </div>
                  <div className="productprice">{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>;
      })}
    </>
  );
};

export default Productstore;
