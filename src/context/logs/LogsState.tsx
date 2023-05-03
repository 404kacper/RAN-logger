import { useReducer, useState, useEffect } from "react";
import LogsContext from "./logsContext";
import LogsReducer from "./logsReducer";

import Log from "../../utils/interpreter/Log";
import LogsStorageManager from "../../utils/manager/LogsStorageManager";

import {
  SET_LOGS,
  REMOVE_LOG,
  ADD_LOG,
  SET_ACTIVE_FILE,
  SET_REMEMBER_PREFERENCES,
  SET_SEARCHED_TERM,
} from "../types";

const LogsState = (props: any) => {
  const logsStorageManager = new LogsStorageManager();
  const [refreshCount, setRefreshCount] = useState(0); // add a counter state

  const getInitialState = () => {
    // Check if user wants to remember preferences and fill in state accordingly
    const initialState = logsStorageManager.retrievePreferencesFromStorage()
      ? {
          // Retrieve and initialize everything with values from storage
          logs: logsStorageManager.retrieveLogsFromStorage(),
          activeFile: logsStorageManager.retrieveActiveFileFromStorage(),
          rememberPreferences:
            logsStorageManager.retrievePreferencesFromStorage(),
          searchedTerm: logsStorageManager.retrieveSearchedTermFromStorage(),
        }
      : {
          // Initialize state to default values
          logs: new Map<string, Log[]>(),
          activeFile: "",
          rememberPreferences: false,
          searchedTerm: "",
        };

    // set everything back to default values in storage if the user does not want to remember preferences
    // if (!logsStorageManager.retrievePreferencesFromStorage()) {
    //   logsStorageManager.replaceLogsInStorage(initialState.logs);

    //   logsStorageManager.replaceActiveFileInStorage(initialState.activeFile);

    //   logsStorageManager.replaceSearchedTermInStorage(
    //     initialState.searchedTerm
    //   );
    // }

    return initialState;
  };

  const [state, dispatch] = useReducer(LogsReducer, getInitialState());

  // useEffect hook to increment refreshCount every time the component re-renders
  useEffect(() => {
    setRefreshCount((prevCount) => prevCount + 1);
    console.log(`LogsState has refreshed ${refreshCount} times.`);
    // console.log(`Current state is: ${JSON.stringify(state)}`);
    // console.log(state.logs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Used on App component initialization - dispatches reducer to update logs state with appropriate data
  const setStoredLogs = (logsMap: Map<string, Log[]>) => {
    dispatch({
      type: SET_LOGS,
      payload: logsMap,
    });
  };

  // Used on Files component while delete button is clicked
  const removeStoredLog = (logName: string) => {
    // Needs a promise since state dispatches are asynchronous
    return new Promise<void>((resolve) => {
      dispatch({
        type: REMOVE_LOG,
        payload: logName,
      });
      resolve();
    });
  };

  // Used on Files component while delete button is clicked
  const addStoredLog = (logName: string, logsArray: Log[]) => {
      dispatch({
        type: ADD_LOG,
        // Payload is array with 1st element as map key and 2nd element as value of that key
        payload: [logName, logsArray],
      });
  };

  // Used on FilesElement to set active log for other components
  const setActiveFile = (fileName: string) => {
    dispatch({
      type: SET_ACTIVE_FILE,
      payload: fileName,
    });
  };

  // Used on FilesElement to set active log for other components
  const setPreferences = (rememberPreferences: boolean) => {
    dispatch({
      type: SET_REMEMBER_PREFERENCES,
      payload: rememberPreferences,
    });
  };

  // Used on FilesElement to set active log for other components
  const setSearchedTerm = (searchedTerm: string) => {
    dispatch({
      type: SET_SEARCHED_TERM,
      payload: searchedTerm,
    });
  };

  return (
    <LogsContext.Provider
      value={{
        logs: state.logs,
        activeFile: state.activeFile,
        rememberPreferences: state.rememberPreferences,
        searchedTerm: state.searchedTerm,
        setStoredLogs,
        removeStoredLog,
        addStoredLog,
        setActiveFile,
        setPreferences,
        setSearchedTerm,
        logsStorageManager,
      }}
    >
      {props.children}
    </LogsContext.Provider>
  );
};

export default LogsState;
