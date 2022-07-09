import React  from 'react'
import Layout from '../../components/Layouts/Layout'
import './style.css'
import Productstore from './ProductStore/Productstore';
import getParam from '../../utils/getParam';
import Productpage from './Productpage/Productpage';

const Productlistpage = (props) => {

    const renderproduct=()=>{
        console.log(props);
        const params=getParam(props.location.search);
        console.log(params);

        let content=null;
        switch(params.type){
            case 'store':
                content=<Productstore {...props}/>
                break;
            case 'page':
                content=<Productpage {...props} />
                break;
            default:
                content=null;

        }
        return content;

    }

  return (
    <Layout>
        <Productstore {...props}/>
        {renderproduct()}

    </Layout>
  )
}

export default Productlistpage
