import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, handleLogout } from '../../helpers/auth'

import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


const PageNavbar = () => {
  const navigate = useNavigate()

  return (

    <Navbar collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand to="/" as={Link}>
          Critterlogue
        </Navbar.Brand>
        <Navbar.Collapse id="app-nav" className="justify-content-end">
          <Nav>
            <Nav.Link to="/" as={Link} eventKey='1'> Home </Nav.Link>
            <Nav.Link to="/animals" as={Link} eventKey='2'> Create an animal </Nav.Link>
            { isAuthenticated() ? 
              <>
                <Nav.Link eventKey='3'><span onClick = {() => handleLogout(navigate)}>Logout</span></Nav.Link>
              </>
              :
              <>
                <Nav.Link to="/auth/login" as={Link} eventKey='4'> Login </Nav.Link>
                <Nav.Link to="/auth/register" as={Link} eventKey='5'> Register </Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default PageNavbar