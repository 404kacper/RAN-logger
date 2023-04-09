import { useState, useContext, useEffect, Fragment } from "react";
import { Table, Pagination } from "react-bootstrap";
import LogsContext from "../../context/logs/logsContext";

const LogsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentActiveFile, setCurrentActiveFile] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [activeFileChanged, setActiveFileChanged] = useState(false);

  const logsContext = useContext(LogsContext);

  const logs = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
    { id: 3, name: "Bob", age: 42 },
    // ...
  ];

  const totalPages = Math.ceil(logs.length / pageSize);
  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = startIndex + pageSize;
  // const currentPageLogs = logs.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentActiveFile(logsContext.activeFile);
  }, [logsContext.activeFile])

  return (
    <div>
      {logsContext.logs.has(logsContext.activeFile) ? (
        <Fragment>
          <Table striped bordered hover>
            <thead>
              <tr>
                {Object.keys(logsContext.logs.get(logsContext.activeFile)[0]).map((member) => (
                  <th key={member}>{member.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
            {logsContext.logs.get(logsContext.activeFile).map((log: any) => (
              <tr key={log.id}>
                {Object.keys(log).map((member) => (
                  <td key={member}>{log[member]}</td>
                ))}
              </tr>
            ))}
              {/* {currentPageLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.id}</td>
                  <td>{log.name}</td>
                  <td>{log.age}</td>
                </tr>
              ))} */}
            </tbody>
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
      ) : null}
    </div>
  );
};

export default LogsList;
