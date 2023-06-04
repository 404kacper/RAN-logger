import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LogsContext from "../../context/logs/logsContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faX, faGear, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"

const SearchBar: React.FC = () => {
  const logsContext = useContext(LogsContext);

  const { localStorageManager, searchedTerm } = logsContext;

  const [userQuery, setUserQuery] = useState(searchedTerm);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    localStorageManager.replaceSearchedTermInStorage(userQuery);

    logsContext.setSearchedTerm(userQuery);
    event.preventDefault();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserQuery(event.target.value);
  };
  const buttonColor= {color: "black"};
  const searchStyle = {
    display: 'flex',
    border: '1px solid rgba(138, 138, 138, 1)',
    marginRight: "0.5rem",
    background: 'rgb(255,255,255)',
    borderRadius: '4px'
  };
  const buttonBorder = {
    border: '1.75px solid rgba(138, 138, 138, 1)',
    marginRight: '1rem',
    background: 'rgb(245,245,245)'
  };
  const transpar={
    background: 'transparent', 
    border:'transparent'
  };
  return (

    <Form className="d-flex" onSubmit={handleSearch}>
      <div style={searchStyle}>
        <Button variant="primary" onClick={handleSearch} style={transpar}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-xl" style={{color: "rgb(175,175,175)"}}/>
        </Button>
        <Form.Control
          type="text"
          placeholder="Search"
          value={userQuery}
          onChange={handleInputChange}
          style={transpar}
        />
      </div>

      <h1 style={{marginRight: "0.5rem", color: "rgb(204,204,204)"}}>|</h1>
      <Button variant="primary" style={buttonBorder}>
        <FontAwesomeIcon icon={faGear} className="fa-xl" style={buttonColor}/>
      </Button>
      <Button variant="primary" style={buttonBorder}>
        <FontAwesomeIcon icon={faX} className="fa-xl" style={buttonColor}/>
      </Button>
    </Form>
  );
};

export default SearchBar;
