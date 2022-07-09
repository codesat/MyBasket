import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {Navbar,Nav,NavDropdown,Container,NavLink,Link} from 'react-bootstrap'
import { signout } from '../../actions/auth.actions';

const Header = (props) => {

const auth=useSelector(state=>state.auth);
const dispatch=useDispatch();

const logout=()=>{
   dispatch(signout());
}

const renderloggedinlinks=()=>{
  return (
    <Nav>
    <li className='nav-item'>
      <span className='nav-link' onClick={logout}>SignOut</span>
    </li>

  </Nav>
  )
}


  const rendernonloggedinlinks=()=>{
    return (
      <Nav>
      <li className='nav-item'><NavLink href="/signin" className='nav-link'>SignIn</NavLink></li>
      <li className='nav-item'><NavLink href="/signup" className='nav-link'>SignUp</NavLink></li>
      {/* <Nav.Link eventKey={2} href="#memes">
        Dank memes
      </Nav.Link> */}
    </Nav>

    )
  }


  return (

 <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" style={{zIndex:1}}>
  <Container fluid>
  <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      {/* <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown> */}
    </Nav>
    {
      auth.authenticate ? renderloggedinlinks() : rendernonloggedinlinks()
    }



  </Navbar.Collapse>
  </Container>
</Navbar>

  )
}

export default Header
