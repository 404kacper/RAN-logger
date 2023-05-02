import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LogsContext from "../../context/logs/logsContext";

const SearchBar: React.FC = () => {
  const logsContext = useContext(LogsContext);
  const [searchTerm, setSearchTerm] = useState(logsContext.searchedTerm);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (logsContext.rememberPreferences) {
      logsContext.logsStorageManager.replaceSearchedTermInStorage(searchTerm);
    } else {
      logsContext.logsStorageManager.replaceSearchedTermInStorage("");
    }

    logsContext.setSearchedTerm(searchTerm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Form className="d-flex" onSubmit={handleSearch}>
      <Form.Control
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button variant="primary" type="submit" className="ml-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
