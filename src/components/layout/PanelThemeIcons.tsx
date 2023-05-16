import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const handleButton1Click = () => {
  console.log("Button 1 clicked!");
};

const handleButton2Click = () => {
  console.log("Button 2 clicked!");
};

const handleButton3Click = () => {
  console.log("Button 3 clicked!");
};

const PanelThemeIcons: React.FC = () => {
  return (
    <Navbar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavItem>
            <Nav.Link
              href="#"
              onClick={handleButton1Click}
            >
              <FontAwesomeIcon icon={faFileArrowUp} size="3x"/>
            </Nav.Link>
          </NavItem>
          
          <NavItem>
            <Nav.Link
              href="#"
              onClick={handleButton2Click}
            >
              <FontAwesomeIcon icon={faFileArrowDown} size="3x"/>
            </Nav.Link>
          </NavItem>

          <NavItem>
            <Nav.Link
              href="#"
              onClick={handleButton3Click}
            >
              <FontAwesomeIcon icon={faSave} size="3x"/>
            </Nav.Link>
          </NavItem>

          {/* <NavItem>
            <Nav.Link
              href="#"
              className="btn btn-success"
              onClick={handleButton2Click}
            >
              <FontAwesomeIcon icon={faSave} /> Save
            </Nav.Link>
          </NavItem> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PanelThemeIcons;
