import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Modal from "../../components/UI/MODAL/Modal";
import { Row, Col, Container } from "react-bootstrap";
// import Input from "../../components/UI/INPUT/input";
import createcategorieslist from "../../helpers/createcategorieslist";
import { useDispatch, useSelector } from "react-redux";
import { createpage } from "../../actions/pageaction";

const Page = (props) => {

  const dispatch=useDispatch();
  const [createmodal, setcreatemodal] = useState(false);
  const [title, settitle] = useState("");
  const [categories, setcategories] = useState([]);
  const [categoryid, setcategoryid] = useState("");
  const [desc, setdesc] = useState("");
  const [type, settype] = useState("");
  const [banners, setbanners] = useState([]);
  const [products, setproducts] = useState([]);
  const category = useSelector(state => state.category);
  const page=useSelector(state=>state.page);

  // console.log(category)

  useEffect(() => {
    setcategories(createcategorieslist(category.categories));
    // console.log(categories);
  }, [category]);

  useEffect(()=>{
    console.log(page);
    if(!page.loading){
      setcreatemodal(false);
      settitle("")
      settype("")
      setdesc("")
      setbanners([])
      setproducts([])
      setcategoryid("")
    }
  },[page]);

  const handlebannerimages=(e)=>{
    setbanners([...banners,e.target.files[0]])
  }

  const handleproductimages=(e)=>{
    setproducts([...products,e.target.files[0]])
  }


  const oncategorychange=(e)=>{
   const category= categories.find(category=>category._id==e.target.value);
   console.log(category);
    setcategoryid(e.target.value);
    settype(category.type);
  }

  const submitpageform=(e)=>{

    if(title===""){
      alert("title required");
      setcreatemodal(false)
      return ;
    }

    const formdata=new FormData();
    formdata.append("title",title);
    formdata.append("description",desc);
    formdata.append("category",categoryid);
        console.log(categoryid);

    formdata.append("type",type)
    banners.forEach((banner,index)=>{
      formdata.append("banners",banner)
    })
    products.forEach((product,index)=>{
      formdata.append("products",product)
    })

    dispatch(createpage(formdata));

    // console.log(categories[0]);
    // console.log(title,desc,categoryid,banners,products);
  }

  const rendercreatepagemodal = () => {
    return (
      <Modal
        show={createmodal}
        modaltitle={"Create New Page"}
        handleClose={()=>setcreatemodal(false)}
        onSubmit={submitpageform}
      >
        <Container>
          <Row>
            <Col>
              <select
                className="form-control"
                value={categoryid}
                onChange={oncategorychange}
              >
                <option value="">select category</option>
                {
                categories.map((cat) => (
                  <option value={cat._id} key={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {/* <Input
              type="select"
              value={categoryid}
              onChange={oncategorychange}
              listofcat={categories}
              placeholder={"select category"}
              /> */}
            </Col>
          </Row>

          <Row>
            <Col>
              <input
               className="form-control"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                placeholder={"Page Title"}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <input
               className="form-control"
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
                placeholder={"Page Desc"}

              />
            </Col>
          </Row>

          <Row>
            {
              banners.length>0 ?
              banners.map((banner,index)=>
                <Row key={index}>
                  <Col>
                  {banner.name}
                  </Col>
                </Row>
              ) : null
            }
            <Col>
              <input
               className="form-control "
                type="file"
                name="banners"
                onChange={handlebannerimages}
              />
            </Col>
          </Row>

          <Row>
          {
              products.length>0 ?
              products.map((product,index)=>
                <Row key={index}>
                  <Col>
                  {product.name}
                  </Col>
                </Row>
              ) : null
            }

            <Col>
              <input
              className="form-control"
                type="file"
                name="products"
                onChange={handleproductimages}
              />
            </Col>
          </Row>

        </Container>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      {
        page.loading ? <p>Creating Page...</p>:
        <>
              {rendercreatepagemodal()}
              <button onClick={() =>setcreatemodal(true)}>Create Page</button>
              </>
      }
    </Layout>
  );
};

export default Page;
