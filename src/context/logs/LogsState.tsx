import { useReducer } from "react";
import LogsContext from "./logsContext";
import LogsReducer from "./logsReducer";

import Log from "../../utils/interpreter/Log";
import LogsStorageManager from "../../utils/manager/LogsStorageManager";

import {
  SET_LOGS,
  SET_ACTIVE_FILE,
  SET_REMEMBER_PREFERENCES,
  SET_SEARCHED_TERM,
} from "../types";

const LogsState = (props: any) => {
  const logsStorageManager = new LogsStorageManager();

  // Initialize global state from values in local storage
  const initialState = {
    logs: logsStorageManager.retrieveLogsFromStorage(),
    activeFile: logsStorageManager.retrieveActiveFileFromStorage(),
    rememberPreferences: logsStorageManager.retrievePreferencesFromStorage(),
    searchedTerm: logsStorageManager.retrieveSearchedTermFromStorage(),
  };

  const [state, dispatch] = useReducer(LogsReducer, initialState);

  // Used on App component initialization - dispatches reducer to update logs state with appropriate data
  const setStoredLogs = (logsMap: Map<string, Log[]>) => {
    dispatch({
      type: SET_LOGS,
      payload: logsMap,
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
