import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LogsContext from "../../context/logs/logsContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faX, faGear, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"

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
    <div className="d-flex">
      <div style={searchStyle}>
        <Button variant="primary" onClick={handleSearch} style={transpar}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-xl" style={{color: "rgb(175,175,175)"}}/>
        </Button>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          style={transpar}
        />
      </div>

      <h1 style={{marginRight: "0.5rem", color: "rgb(204,204,204)"}}>|</h1>
      <Button variant="primary" onClick={handleSearch} style={buttonBorder}>
        <FontAwesomeIcon icon={faGear} className="fa-xl" style={buttonColor}/>
      </Button>
      <Button variant="primary" onClick={handleSearch} style={buttonBorder}>
        <FontAwesomeIcon icon={faX} className="fa-xl" style={buttonColor}/>
      </Button>
    </div>
  );
};

export default SearchBar;
