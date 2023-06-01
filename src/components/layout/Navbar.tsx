import React from "react";
import { Navbar,  Container } from "react-bootstrap";

const NavbarCentre: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand><img src="./samsung.png" width="170" height="27" alt=""/></Navbar.Brand>
        <Navbar.Brand>RAN</Navbar.Brand>
        <Navbar.Brand>|</Navbar.Brand>
        <Navbar.Brand>Log Viewer</Navbar.Brand>
      </Container>
    </Navbar>   
  );
};

export default NavbarCentre;
