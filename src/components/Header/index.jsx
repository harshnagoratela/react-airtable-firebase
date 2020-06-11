import React from "react"
import { Link } from "gatsby"
import { Navbar, Nav, NavDropdown, Form, InputGroup, FormControl } from 'react-bootstrap';

const Header = () => {

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top">
        <Navbar.Brand href="/">
          {' '}HYPER<span className="text-primary">LYST</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/app/project/create">Create Project</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
