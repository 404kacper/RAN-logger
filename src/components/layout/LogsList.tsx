import { useContext, Fragment, useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import LogsContext from '../../context/logs/logsContext';
import DbContext from '../../context/db/dbContext';

const LogsList: React.FC = () => {
  const logsContext = useContext(LogsContext);
  const dbContext = useContext(DbContext);

  const { activeFile, dbIsReady } = logsContext;
  const { indexedDbStorageManager } = dbContext;

  // Check if active file exists in the map
  // Should probably be a global state so that other components can access these aswell
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Only execute query and update state when db is done initalizing
    if (dbIsReady) {
      // Async function that's called immediately inside useEffect hook - to await query from indexedDb
      const fetchLogs = async () => {
        // Here loading state can be set to true

        const logsFromDb = await indexedDbStorageManager.getLogs(activeFile);
        // Set local state to trigger re-render of LogsList component
        setLogs(logsFromDb);
      };

      // Call above async function
      fetchLogs();
      // Here loading state can be set to false
    }
    // dbIsReady since this is the current way of handling asynchronous connection to db
    // this approach is a little different from how fileNames are initialized - due to the fact that logs in this component are local state
  }, [activeFile, dbIsReady]);

  // Return div with information if stored table is empty
  if (logs.length === 0) {
    return <div>No logs data available...</div>;
  }

  const highlightMatches = (
    text: string | null | undefined,
    query: string,
    index: number
  ): JSX.Element[] => {
    if (typeof text !== 'string' || text === null || text === undefined) {
      return [<Fragment key={index}>{text}</Fragment>];
    }
    if (!query) {
      return [<Fragment key={index}>{text}</Fragment>];
    }
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i}>{part}</mark>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      )
    );
  };

  const filteredLogs = logs.filter((log: any) => {
    if (logsContext.searchedTerm !== '') {
      const joinedValues = Object.values(log).join(' ').toLowerCase();
      return joinedValues.includes(logsContext.searchedTerm.toLowerCase());
    } else {
      return log;
    }
  });

  return (
    <Container
      fluid
      className='logs-list d-flex flex-column justify-content-between'
    >
      <Table striped bordered hover variant='light'>
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
                  <td key={index} style={{ height: '5vh' }}>
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
