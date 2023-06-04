import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LogsContext from "../../context/logs/logsContext";

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

  return (
    <Form className="d-flex" onSubmit={handleSearch}>
      <Form.Control
        type="text"
        placeholder="Search"
        value={userQuery}
        onChange={handleInputChange}
      />
      <Button variant="primary" type="submit" className="ml-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBar;
