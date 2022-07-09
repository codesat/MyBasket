import React, { useState } from 'react';
import Layout from '../../components/Layout'
import Input from '../../components/UI/INPUT/input'
import { Container ,Row,Col} from 'react-bootstrap'
import  Table from 'react-bootstrap/Table'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addproduct } from '../../actions/product.action';
import Modal from '../../components/UI/MODAL/Modal'
import './productstyle.css'
import { generatepublicurl } from '../../urlconfig';

const Products = () => {

  const [name,setname]=useState("");
  const [quantity,setquantity]=useState("");
  const [price,setprice]=useState("");
  const [description,setdescription]=useState("");
  const [categoryid,setcategoryid]=useState("");
  const [productpictures,setproductpictures]=useState([]);
  const dispatch=useDispatch();
  const category=useSelector(state=>state.category);
  const oneproduct=useSelector(state=>state.product);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [productdetailsmodal,setproductdetailsmodal]=useState(false);
  const [productdetails,setproductdetails]=useState(null);

          const handleClose = () => {

            const formdata=new FormData();
            formdata.append("name",name);
            formdata.append("price",price);
            formdata.append("quantity",quantity);
            formdata.append("description",description);
            formdata.append("category",categoryid);

            for(let pic of productpictures){
              formdata.append("productpictures",pic)
            }
            console.log(formdata)
            dispatch(addproduct(formdata));
            setShow(false);


          };

          const createcategorieslist=(categories, options=[])=>{
            for(let category of categories){
                options.push({
                    value:category._id, name:category.name
                });

                if(category.children.length>0){
                    createcategorieslist(category.children,options);
                }
            }

            return options;
        }

        const handleproductpictures=(e)=>{
          setproductpictures([
            ...productpictures,
            e.target.files[0]

          ])
        }

         console.log(oneproduct)

        const renderproducts=()=>{
          return (
            <Table style={{fontSize:12}} responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                {/* <th>Description</th> */}
                {/* <th>Pictures</th> */}
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {
                oneproduct.products.length>0?
                oneproduct.products.map((singleproduct)=>(
                  <tr onClick={()=>showproductdetailsmodal(singleproduct)} key={singleproduct._id}>
                    <td>1</td>
                    <td>{singleproduct.name}</td>
                    <td>{singleproduct.price}</td>
                    <td>{singleproduct.quantity}</td>
                    {/* <td>{singleproduct.description}</td> */}
                    <td>{singleproduct.category.name}</td>
                  </tr>
                )):null
              }
            </tbody>
  </Table>
          )
        }


        const renderaddproductmodal=()=>{
        return(
          <Modal
          show={show}
          handleClose={handleClose}
          modaltitle={"Add new Product"}

          >
             <label>Name</label>
              <Input
              value={name}
              placeholder={'Product Name'}
              onChange={(e)=>setname(e.target.value)}/>

           <label>Price</label>
              <Input
              value={price}
              placeholder={'Price'}
              onChange={(e)=>setprice(e.target.value)}/>

             <label>Quantity</label>
              <Input
              value={quantity}
              placeholder={'Quantity'}
              onChange={(e)=>setquantity(e.target.value)}/>

            <label>Description</label>
              <Input
              value={description}
              placeholder={'Description'}
              onChange={(e)=>setdescription(e.target.value)}/>

        <select
              value={categoryid}
              onChange={(e)=>setcategoryid(e.target.value)}
               className='form-control'
                >
                  <option>
                      Select Category
                  </option>

                  {
                      createcategorieslist(category.categories).map((options)=>(
                          <option key={options.value} value={options.value}>{options.name}</option>
                      )

                      )
                  }
              </select>

              {
                  productpictures.length>0 ?
                  productpictures.map((pic,index)=>(<div key={index}>{pic.name}</div>)):null
              }

        <input
        type="file"
        name="productpictures"
        style={{marginTop:"10px"}}
        onChange={handleproductpictures} />
          </Modal>
        )
        }


        const handlecloseproductdetailmodal=()=>{
          setproductdetailsmodal(false);

        }

        const showproductdetailsmodal=(singleproduct)=>{
          setproductdetailsmodal(true);
          setproductdetails(singleproduct);
          console.log(singleproduct)
        }


        const renderproductdetailmodal=()=>{

          if(!productdetails){
            return null;

          }

          return (
            <Modal
            show={productdetailsmodal}
            handleClose={handlecloseproductdetailmodal}
            modaltitle={"Product Details"}
            size="lg"
            >
            <Row>
              <Col md={6}>
                <label className='key'>Name</label>
                <p className='value'>{productdetails.name}</p>
              </Col>
              <Col md={6}>
                <label className='key'>Price</label>
                <p className='value'>{productdetails.price}</p>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <label className='key'>Category</label>
                <p className='value'>{productdetails.category.name}</p>
              </Col>
              <Col md={6}>
                <label className='key'>Quantity</label>
                <p className='value'>{productdetails.quantity}</p>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <label className='key'>Description</label>
                <p className='value'>{productdetails.description}</p>
              </Col>
            </Row>

            <Row>
              <Col >
              <label className='key'>Product Pictures</label>
               <div style={{display:"flex"}}>
               {
                  productdetails.productpictures.map((picture)=>
                    <div className="productimgcontainer">
                      <img src={generatepublicurl(picture.img)} alt="" />
                    </div>
                    )
                }
               </div>
              </Col>
            </Row>

            </Modal>
          )
        }

  return (
 <Layout sidebar>

        <Container>
        <Row>
            <Col md={12}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <h3>Products</h3>
                <button onClick={handleShow}>Add</button>
                </div>

            </Col>
        </Row>
        <Row>
          <Col md={12}>

          {renderproducts()}

          </Col>
        </Row>
        </Container>
        {
          renderaddproductmodal()
        }
        {renderproductdetailmodal()}




 </Layout>
  )
}

export default Products
