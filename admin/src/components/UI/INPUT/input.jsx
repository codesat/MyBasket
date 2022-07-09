import React from "react";
import { Form } from "react-bootstrap";

const Input = (props) => {
        return
          (
            <Form.Group className="mb-3">
          <Form.Control
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            {...props}
          />
          <Form.Text className="text-muted">{props.errormessage}</Form.Text>
        </Form.Group>
          )

    }



export default Input;
