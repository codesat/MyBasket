import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addcategory,
  deletemycategory,
  updatecategory,
} from "../../actions/category.action";
import Layout from "../../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "../../components/UI/MODAL/Modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckboxOutline,
  IoIosTrash,
  IoIosAdd,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosCloudUpload,
} from "react-icons/io";
import Updatecategorymodal from "./components/updatecategoriesmodal";
import Addcategorymodal from "./components/addcategorymodal";
import "./style.css";
import getallcategory from "../../actions/category.action";

const Category = (props) => {
  const [show, setShow] = useState(false);
  const [categoryname, setcategoryname] = useState("");
  const [parentcategoryid, setparentcategoryid] = useState("");
  const [categoryimage, setcategoryimage] = useState("");
  const [checked, setChecked] = useState([]);
  const [imgstatus, setimgstatus] = useState("none");
  const [expanded, setExpanded] = useState([]);
  const [deletecategory, setdeletecategory] = useState(false);
  const [checkedArray, setcheckedArray] = useState([]);
  const [expandedArray, setexpandedArray] = useState([]);
  const [updatecategorymodal, setupdatecategorymodal] = useState(false);
  const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);
  const category = useSelector(state => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!category.loading) {
      setShow(false);
    }
  }, [category.loading]);

  const handleClose = () => {
    const formdata = new FormData();

    if (categoryname === "") {
      alert("Category name is required");
      setShow(false);
      return;
    }

    formdata.append("name", categoryname);
    formdata.append("parentid", parentcategoryid);
    formdata.append("categoryimage", categoryimage);
    dispatch(addcategory(formdata));
    //after dispatching we will empty the target values/update the states
    setcategoryimage("");
    setcategoryname("");
    setparentcategoryid("");
    // console.log(categoryname+" "+parentcategoryid+" "+categoryimage)
    // const cat={
    //     categoryname,
    //     parentcategoryid,
    //     categoryimage
    // }

    // console.log(cat)
    setShow(false);
  };

  const handlecategoryimage = (e) => {
    setimgstatus("block");
    const data2 = new FormData();
    data2.append("file", e.target.files[0]);
    data2.append("upload_preset", "categoryimg");
    data2.append("cloud_name", "codercloud");

    //upload
    fetch("https://api.cloudinary.com/v1_1/codercloud/image/upload", {
      method: "post",
      body: data2,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.url)
        setcategoryimage(data.url);
        setimgstatus("none");
      });
  };

  // useEffect(()=>{
  //     dispatch(getallcategory());
  // },[]);

  const rendercategories = (categories) => {
    let mycategories = [];
    for (let category of categories) {
      //pushing li tag in mycategories
      // console.log(category.categoryimage)
      mycategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && rendercategories(category.children),
      });
    }
    return mycategories;
  };
  const createcategorieslist = (categories, options = []) => {

    for (let category of categories) {
      options.push({
        _id: category._id,
        name: category.name,
        parentid: category.parentid,
        type: category.type,
      });

      if (category.children.length > 0) {
        createcategorieslist(category.children, options);
      }
    }

    return options;
  };

  const updateCategory = () => {
    checkedandexpandedcatgeories();
    setupdatecategorymodal(true);
  };
  const checkedandexpandedcatgeories = () => {
    const categories = createcategorieslist(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryid, index) => {
        const category = categories.find(
          (category, _index) => categoryid == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryid, index) => {
        const category = categories.find(
          (category, _index) => categoryid == category.value
        );
        category && expandedArray.push(category);
      });

    setcheckedArray(checkedArray);
    setexpandedArray(expandedArray);
    // console.log(
    //   checked,
    //   expanded,
    //   categories,
    //   checkedArray.length,
    //   expandedArray.length
    // );
  };

  const handelcategoryinput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedcheckedarray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setcheckedArray(updatedcheckedarray);
    } else if (type == "expanded") {
      const updatedexpandedarray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setexpandedArray(updatedexpandedarray);
    }

    console.log(expandedArray,checkedArray)
  };
  const updateCategoriesform = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentid", item.parentid ? item.parentid : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentid", item.parentid ? item.parentid : "");
      form.append("type", item.type);
    });

    dispatch(updatecategory(form));
    setupdatecategorymodal(false);
  };

  const deletecategoryfunc = () => {
    checkedandexpandedcatgeories();
    setdeletecategory(true);
  };

  const deletecategories = () => {
    const checkedidsarray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));
    // const expandedidsarray = expandedArray.map((item, index) => ({
    //   _id: item.value,
    // }));
    //just making a single array of ids
        // const idsarray=expandedidsarray.concat(checkedidsarray);

    if (checkedidsarray.length > 0) {
      console.log(checkedidsarray)
      dispatch(deletemycategory(checkedidsarray)).then((result) => {
        if (result) {
          dispatch(getallcategory());
          setdeletecategory(false);
        }
      });
    }
    setdeletecategory(false);
  };

  const renderdeletecategorymodal = () => {
    return (
      <Modal
        modaltitle="Confirm"
        show={deletecategory}
        handleClose={() => setdeletecategory(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              alert("no");
            },
          },
          { label: "Yes",
          color: "danger",
          onClick: deletecategories },
        ]}
      >
        <h5>Expanded</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Checked</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
  };
  const categorylist = createcategorieslist(category.categories);

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <div className="actionbtncontainer">
                <span>Actions: </span>
                <button onClick={handleShow}>
                  <IoIosAdd />
                  <span>Add</span>
                </button>
                <button onClick={deletecategoryfunc}>
                  <IoIosTrash />
                  <span>Delete</span>
                </button>
                <button onClick={updateCategory}>
                  <IoIosCloudUpload />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul> */}
            {/* {rendercategories(category.categories)} */}
            {/* {JSON.stringify(createcategorieslist(category.categories))} */}
            {/* </ul> */}

            <CheckboxTree
              nodes={rendercategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>

      {renderdeletecategorymodal()}

      <Addcategorymodal
        show={show}
        onSubmit={handleClose}
        imgstatus={imgstatus}
        modaltitle={"Add New Categories"}
        handleClose={() => setShow(false)}
        categoryname={categoryname}
        setcategoryname={setcategoryname}
        parentcategoryid={parentcategoryid}
        setparentcategoryid={setparentcategoryid}
        categorylist={categorylist}
        handlecategoryimage={handlecategoryimage}
      />

      <Updatecategorymodal
        onSubmit={updateCategoriesform}
        modaltitle={"Update Categories"}
        show={updatecategorymodal}
        handleClose={()=>setupdatecategorymodal(false)}
        size="lg"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handelcategoryinput={handelcategoryinput}
        categorylist={categorylist}
      />
    </Layout>
  );
};

export default Category;
