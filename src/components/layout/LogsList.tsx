import { useState, useContext } from "react";
import { Table, Container } from "react-bootstrap";
import LogsContext from "../../context/logs/logsContext";
import SearchBar from "../layout/SearchBar";


const LogsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const logsContext = useContext(LogsContext)
  
  
  
  // Check if the active file exists in the map
  const logs = logsContext.logs.get(logsContext.activeFile);
  if (!logsContext.logs.has(logsContext.activeFile) || !logs) {
    return <div>No logs available.</div>;
  }

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const highlightMatches = (text: string | null | undefined, query: string): JSX.Element[] => {
  if (typeof text !== 'string' || text === null || text === undefined) return [<>{text}</>];
  if (!query) return [<>{text}</>];
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i}>{part}</mark>
    ) : (
      <>{part}</>
    )
  );
};



const filteredLogs = logs.filter((log: any) => {
  const values = Object.values(log).filter((value) => value); // <- usuwa undefined z listy wartości
  const joinedValues = values.join(" ").toLowerCase();
  return joinedValues.includes(searchTerm.toLowerCase());
});

  
  return (
    <Container fluid className="logs-list d-flex flex-column justify-content-between">
      <SearchBar onSearch={handleSearch} />

      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th></th> {/* pusta komórka dla checkboxa */}
            {Object.keys(logs[0]).map((member, index) => (
              <th key={index}>{member.toUpperCase()}</th>
            ))}
          </tr>
        </thead>

        {filteredLogs.length > 0 ? (
          <tbody>
            {filteredLogs.map((log: any, index: number) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" /> {/* checkbox */}
                </td>
                {Object.keys(log).map((member, index) => (
                  <td key={index} style={{ height: "5vh" }}>
                    {highlightMatches(log[member], searchTerm)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={Object.keys(logs[0]).length}>No data available.</td>
            </tr>
          </tbody>
        )}
      </Table>
    </Container>
  );
};

export default LogsList;
