import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LogsContext from "../../context/logs/logsContext";

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

  return (
    <div className="d-flex">
      <Form.Control
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button variant="primary" onClick={handleSearch} className="ml-2">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
