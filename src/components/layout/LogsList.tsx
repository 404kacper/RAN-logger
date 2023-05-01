import { useContext, Fragment } from "react";
import { Table, Container } from "react-bootstrap";
import LogsContext from "../../context/logs/logsContext";

const LogsList = () => {
  const logsContext = useContext(LogsContext);

  // Check if active file exists in the map
  const logs = logsContext.logs.get(logsContext.activeFile);

  if (!logsContext.logs.has(logsContext.activeFile) || !logs) {
    return <div>No logs available.</div>;
  }

  const highlightMatches = (
    text: string | null | undefined,
    query: string,
    index: number
  ): JSX.Element[] => {
    if (typeof text !== "string" || text === null || text === undefined) {
      return [<Fragment key={index}>{text}</Fragment>];
    }
    if (!query) {
      return [<Fragment key={index}>{text}</Fragment>];
    }
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    console.log("Executing part responsible for mark return");
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i}>{part}</mark>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    );
  };

  const filteredLogs = logs.filter((log: any) => {
    if (logsContext.searchedTerm !== "") {
      const joinedValues = Object.values(log).join(" ").toLowerCase();
      return joinedValues.includes(logsContext.searchedTerm.toLowerCase());
    } else {
      return log;
    }
  });

  return (
    <Container
      fluid
      className="logs-list d-flex flex-column justify-content-between"
    >
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            {Object.keys(logs[0]).map((member, index) => (
              <th key={index}>{member.toUpperCase()}</th>
            ))}
          </tr>
        </thead>

        {filteredLogs.length > 0 ? (
          <tbody>
            {filteredLogs.map((log: any, index: number) => (
              <tr key={index}>
                {Object.keys(log).map((member, index) => (
                  <td key={index} style={{ height: "5vh" }}>
                    {/* {log[member]} */}
                    {highlightMatches(
                      log[member],
                      logsContext.searchedTerm,
                      index
                    )}
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
