import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const handleButton1Click = () => {
  console.log("Button 1 clicked!");
};

const handleButton2Click = () => {
  console.log("Button 2 clicked!");
};

const NavbarCentre: React.FC = () => {
  return (
    <Navbar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavItem>
            <Nav.Link
              href="#"
              className="btn btn-primary"
              onClick={handleButton1Click}
            >
              Button 1
            </Nav.Link>
          </NavItem>
          <NavItem>
            <Nav.Link
              href="#"
              className="btn btn-success"
              onClick={handleButton2Click}
            >
              <FontAwesomeIcon icon={faSave} /> Save
            </Nav.Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarCentre;
