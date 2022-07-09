import React from "react";
import Modal from "../../../components/UI/MODAL/Modal";
import Input from "../../../components/UI/INPUT/input";
import { Row, Col } from "react-bootstrap";

const updatecategorymodal = (props) => {
  const {
    size,
    show,
    handleClose,
    modaltitle,
    expandedArray,
    checkedArray,
    handelcategoryinput,
    categorylist,
    onSubmit
  } = props;

  return (
    <Modal
      show={show}
      onSubmit={onSubmit}
      handleClose={handleClose}
      modaltitle={modaltitle}
      size={size}
    >
      <Row>
        <Col>
          <h6>Expanded Categories</h6>
        </Col>
      </Row>

      {expandedArray.length > 0 &&
        expandedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={"Category Name"}
                onChange={(e) =>
                  handelcategoryinput("name", e.target.value, index, "expanded")
                }
              />
            </Col>
            <Col>
              <select
                value={item.parentid}
                onChange={(e) =>
                  handelcategoryinput(
                    "parentid",
                    e.target.value,
                    index,
                    "expanded"
                  )
                }
                className="form-control"
              >
                <option>select category</option>
                {categorylist.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handelcategoryinput("type", e.target.value, index, "expanded")
                }
              >
                <option value="">Select Type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Col>
          </Row>
        ))}
      <Row>
        <Col>
          <h6>Checked Categories</h6>
        </Col>
      </Row>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={"Category Name"}
                onChange={(e) =>
                  handelcategoryinput("name", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col>
              <select
                value={item.parentid}
                onChange={(e) =>
                  handelcategoryinput(
                    "parentid",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
                className="form-control"
              >
                <option>Select Category</option>
                {categorylist.map((options) => (
                  <option key={options.value} value={options.value}>
                    {options.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select
                className="form-control"
                value={item.type}
                onChange={(e) =>
                  handelcategoryinput("type", e.target.value, index, "checked")
                }
              >
                <option value="">Select Type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </select>
            </Col>
          </Row>
        ))}
      {/* <input type="file"
              name="categoryimage"
              style={{marginTop:"10px"}}
              onChange={handlecategoryimage}/> */}
    </Modal>
  );
};

export default updatecategorymodal;
