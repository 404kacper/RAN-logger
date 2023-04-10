import { useState, useContext, Fragment } from "react";
import { Table, Pagination, Container } from "react-bootstrap";
import LogsContext from "../../context/logs/logsContext";

const LogsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const logsContext = useContext(LogsContext);

  // Check if the active file exists in the map
  const logs = logsContext.logs.get(logsContext.activeFile);
  if (!logsContext.logs.has(logsContext.activeFile) || !logs) {
    return <div>No logs available.</div>;
  }

  const totalPages = Math.ceil(logs.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Fragment>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              {Object.keys(logs[0]).map((member, index) => (
                <th key={index}>{member.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          {logs.length > 0 ? (
            <tbody>
            {logs.slice(startIndex, endIndex).map((log: any, index: number) => (
              <tr key={index}>
                {Object.keys(log).map((member, index) => (
                  <td key={index}  style={{height:'5vh'}}>{log[member]}</td>
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

      <Pagination>
        <Pagination.First
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        />
        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        />
        <Pagination.Last
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        />
      </Pagination>
    </Fragment>
    </Container>
  );
};

export default LogsList;
