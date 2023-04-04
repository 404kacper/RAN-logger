import { useReducer, useEffect } from 'react';
import LogsContext from './logsContext';
import LogsReducer from './logsReducer';

import Log from '../../utils/interpreter/Log';
import LogInterpreter from '../../utils/interpreter/LogInterpreter';

import {
  GET_LOGS
} from '../types';

const LogsState = (props: any) => {
  const initialState = {
    logs: new Map<string, Log[]>()
  };

  const [state, dispatch] = useReducer(LogsReducer, initialState);

  // Used on App component initialization - dispatches reducer to update logs state with appropriate data
  const getStoredLogs = (logsMap: Map <string, Log[]>) => {
    dispatch({
      type: GET_LOGS,
      payload: logsMap
    });
  };


  const retrieveLogsFromStorage = (): Map <string, Log[]>  => {
    const storagePrefix: string = "samsung-ran-logger-";
    const storageObject = JSON.parse(localStorage.getItem(storagePrefix + 'files') as string);
    const storedLogs = new Map<string, Log[]>();

    // For each file interpeter creates key: value pair to store objects - file name with extension is used to retrieve the Log objects
    storageObject.forEach((logFile: string[]) => {
      const fileName = logFile[0];
      const fileContents = logFile[1];

      const logInterpreter = new LogInterpreter(fileContents);

      const logObjects = logInterpreter.parseLogs();
      storedLogs.set(fileName, logObjects);
    })

    return storedLogs;
  }

  // Retrieve logs on app mount
  useEffect (() => {
    const logsMap = retrieveLogsFromStorage();
    // Dispatch action to update logs state
    getStoredLogs(logsMap);
  },[]);

  return (
    <LogsContext.Provider
      value={{
        logs: state.logs,
        getStoredLogs,
        retrieveLogsFromStorage
      }}
    >
      {props.children}
    </LogsContext.Provider>
  );
};

export default LogsState;