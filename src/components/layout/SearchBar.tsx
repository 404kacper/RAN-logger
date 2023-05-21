import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LogsContext from "../../context/logs/logsContext";
import { Navbar, Nav, NavItem } from "react-bootstrap";

import { faSave } from "@fortawesome/free-solid-svg-icons";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar: React.FC = () => {
  const logsContext = useContext(LogsContext);
  const [searchTerm, setSearchTerm] = useState(logsContext.searchedTerm);

  const handleSearch = () => {
    if (logsContext.activeFile !== "") {
      logsContext.logsStorageManager.replaceSearchedTermInStorage(searchTerm);
      console.log("Search term from SearchBar component: " + searchTerm);
      logsContext.setSearchedTerm(searchTerm);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleButton1Click = () => {
  console.log("Button 1 clicked!");
};

const handleButton2Click = () => {
  console.log("Button 2 clicked!");
};

// const handleButton3Click = () => {
//   console.log("Button 3 clicked!");
// };

  return (
    //<div className="d-flex">


    <Navbar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
          />
          {/* <Button variant="primary" onClick={handleSearch} className="ml-2">
            Search
          </Button> */}

          <NavItem>
                <Nav.Link
                  href="#"
                  onClick={handleButton1Click}
                  style={{
                    border: "1px solid #000000", // Kolor i grubość obwódki
                    borderRadius: "8px", // Zaokrąglenie rogów obwódki
                  }}
                >
                  <FontAwesomeIcon icon={faFilter} size="2x"/>
                  {/* <FontAwesomeIcon icon={} /> */}
                </Nav.Link>
          </NavItem>
              
          <NavItem>
            <Nav.Link
              href="#"
              onClick={handleButton2Click}
              style={{
                border: "1px solid #000000", // Kolor i grubość obwódki
                borderRadius: "8px", // Zaokrąglenie rogów obwódki
              }}
            >
              <FontAwesomeIcon icon={faXmark} size="2x"/>
            </Nav.Link>
          </NavItem>

          {/* <NavItem>
            <Nav.Link
              href="#"
              onClick={handleButton3Click}
            >
              <FontAwesomeIcon icon={faSave} size="3x"/>
            </Nav.Link>
          </NavItem> */}

          </Nav>
      </Navbar.Collapse>
    </Navbar>

    //</div>
  );
};

export default SearchBar;
