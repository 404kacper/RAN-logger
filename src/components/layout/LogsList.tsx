import { useState, useContext, useEffect, Fragment } from "react";
import { Table, Pagination } from "react-bootstrap";
import LogsContext from "../../context/logs/logsContext";

const LogsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const logsContext = useContext(LogsContext);

  const totalPages = Math.ceil(3);
  // const startIndex = (currentPage - 1) * pageSize;
  // const endIndex = startIndex + pageSize;
  // const currentPageLogs = logs.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {logsContext.logs.has(logsContext.activeFile) ? (
        <Fragment>
          <Table striped bordered hover>
            <thead>
              <tr>
                {Object.keys(logsContext.logs.get(logsContext.activeFile)[0]).map((member) => (
                  <th>{member.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            {logsContext.logs.get(logsContext.activeFile).length > 0 ? (
              <tbody>
              {logsContext.logs.get(logsContext.activeFile).map((log: any) => (
                <tr>
                  {Object.keys(log).map((member) => (
                    <td>{log[member]}</td>
                  ))}
                </tr>
              ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={Object.keys(logsContext.logs.get(logsContext.activeFile)[0]).length}>No data available.</td>
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
      ) : null}
    </div>
  );
};

export default LogsList;
