import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Layout from '../components/Layout'
import { Form,Button ,Row,Col} from 'react-bootstrap'
import Input from '../components/UI/INPUT/input'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import signupbhai from '../actions/user.actios'


const Signup = () => {


  const auth=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const [fname,setfname]=useState("");
  const [lname,setlname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  // const [error,seterror]=useState("");
 const user=useSelector(state=>state.auth);


  const usersignup=(e)=>{

    e.preventDefault();

    const user={
      fname,lname,email,password
    }
    dispatch(signupbhai(user))

  }

  if(auth.authenticate){
    return <Navigate  to={"/"}/>

  }
  if(user.loading){
    return <p>LOADING...</p>
  }



  return (
    <div>
       <Layout>
            <Container>
              {user.message}
           <Row style={{marginTop:'50px'}}>
            <Col md={{span:6,offset:3}}>
            <Form onSubmit={usersignup}>
                <Row>
                    <Col md={6}>
                    <Input
                    label="FirstName"
                    placeholder="Enter your Firstname"
                    type="text"
                    value={fname}
                    onChange={(e)=>{setfname(e.target.value)}}
                    />

                    </Col>
                    <Col md={6}>
                    <Input
                    label="LastName"
                    placeholder="Enter your Lastname"
                    type="text"
                    value={lname}
                    onChange={(e)=>{setlname(e.target.value)}}
                    />
                    </Col>
                </Row>
                <Input
                    label="Email"
                    placeholder="Enter your Email"
                    type="text"
                    value={email}
                    onChange={(e)=>{setemail(e.target.value)}}
                    />

                    <Input
                    label="Password"
                    placeholder="Enter your Password"
                    type="text"
                    value={password}
                    onChange={(e)=>{setpassword(e.target.value)}}
                    />

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
            </Col>
           </Row>
            </Container>
        </Layout>
    </div>
  )
}

export default Signup
