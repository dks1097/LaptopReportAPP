import React, { Component} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';

import  TechnicalReport  from "./TechnicalReport";
import  UserReport  from "./UserReport";


export default class NavBarComponents extends Component {

  render() {
    return (
        <Router>
            <div >
                <Navbar bg="dark" variant="dark">
                    <Container>
                    <Navbar.Brand href="#home" style={{color:"#c97e53" }}>Laptop Report App</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/UserReport"}>User Report</Nav.Link>
                        <Nav.Link as={Link} to={"/TechnicalReport"}>Technical Report</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
            </div>
            <div>
                <Routes>
                    <Route path="UserReport" element={<UserReport/>}/>
                    <Route path="TechnicalReport" element={<TechnicalReport/>}/>
                </Routes>
            </div>
      </Router>
    );
  }
}
