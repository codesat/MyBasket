import React from 'react'
import { getProductPage } from '../../../actions/product.action'
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react';
import getParam from '../../../utils/getParam';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../../components/UI/Card/Card';


const Productpage = (props) => {
    const dispatch=useDispatch();
    const product=useSelector(state=>state.product);
    const {page}=product;

    useEffect(()=>{
        const params=getParam(props.location.search)
        const payload={
                params
        }
        dispatch(getProductPage(payload));
    },[])

  return (
    <div style={{margin:"0 10px"}}>
        <h3>{page.title}</h3>
    <Carousel>
      renderThumbs={()=>{}}
      {
        page.banners && page.banners.map((banner,index)=>{
          <a
           key={index}
           style={{display:"block"}}
           href={banner.navigateTo}
           >
            <img src={banner.img} alt=""/>
          </a>
        })
      }
    </Carousel>
    <div
      style={{
        justifyContent:"space-between",
        display:"flex",
        flexWrap:"wrap",
        margin:"10px 0"
      }}
    >
      {
        page.products && page.products.map((product,index)=>{
          <Card
          key={index}
          style={{
            width:"400px",
            height:"200px",
            margin:"0 5px"
          }}
          >
            <img
            style={{
              height:"100%",
              width:"100%"
            }}
            src={product.img} alt=""/>

          </Card>
        })
      }

    </div>
    </div>
  )
}

export default Productpage
