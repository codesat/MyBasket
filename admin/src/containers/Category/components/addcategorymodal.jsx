import React from "react";
import Modal from "../../../components/UI/MODAL/Modal";
import Input from "../../../components/UI/INPUT/input";
import { Row, Col } from "react-bootstrap";

const addcategorymodal = (props) => {
  const {
    show,
    imgstatus,
    handleClose,
    modaltitle,
    categoryname,
    setcategoryname,
    parentcategoryid,
    setparentcategoryid,
    categorylist,
    handlecategoryimage,
    onSubmit,
  } = props;

  return (
    <Modal
      show={show}
      handleClose={handleClose}
      onSubmit={onSubmit}
      modaltitle={modaltitle}
    >
      <Row>
        <Col>
          <Input
            value={categoryname}
            placeholder={"Category Name"}
            onChange={(e) => setcategoryname(e.target.value)}
          />
        </Col>
        <Col>
          <select
            value={parentcategoryid}
            onChange={(e) => setparentcategoryid(e.target.value)}
            className="form-control form-control-sm"
          >
            <option>Select Category</option>
            {categorylist.map((options) => (
              <option key={options.value} value={options.value}>
                {options.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="file"
            name="categoryimage"
            className="form-control"
            style={{ marginTop: "10px" }}
            onChange={handlecategoryimage}
          />
        </Col>
      </Row>

      <p style={{ display: imgstatus }}>Loading...</p>
    </Modal>
  );
};

export default addcategorymodal;
