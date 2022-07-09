import { React,useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Layout from '../components/Layout'
import { Form,Button ,Row,Col} from 'react-bootstrap'
import Input from '../components/UI/INPUT/input'
import { login} from '../../src/actions/action'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Signin = (props) => {


  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [error,seterror]=useState("");
  const auth=useSelector(state=>state.auth);

  const dispatch=useDispatch();

  const userlogin=(e)=>{

    e.preventDefault();

    const user={
      email,
      password
     }

     dispatch(login(user));
  };


  if(auth.authenticate){
    return <Navigate  to={"/"}/>

  }

  return (
    <div>
        <Layout>
            <Container>
           <Row style={{marginTop:'100px'}}>
            <Col md={{span:6,offset:3}}>

           <Form onSubmit={userlogin}>
                <Input
                    label="Email"
                    placeholder="Enter your Email"
                    type="text"
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
                    />

                    <Input
                    label="Password"
                    placeholder="Enter your Password"
                    type="text"
                    value={password}
                    onChange={(e)=>setpassword(e.target.value)}
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

export default Signin
