import { useReducer, useEffect, useContext } from 'react';
import LogsContext from './logsContext';
import DbContext from '../db/dbContext';
import LogsReducer from './logsReducer';

import Log from '../../utils/interpreter/Log';
import LogsStorageManager from '../../utils/manager/LogsStorageManager';

import {
  SET_LOGS,
  REMOVE_LOG,
  ADD_LOG,
  SET_ACTIVE_FILE,
  SET_REMEMBER_PREFERENCES,
  SET_SEARCHED_TERM,
  SET_DB_READY,
  SET_FILE_NAMES
} from '../types';

const LogsState = (props: any) => {
  const logsStorageManager = new LogsStorageManager();
  // Context for db instance - it's purpose is that when LogsState re-renders new instance of IndexedDbManager isn't created
  const dbContext = useContext(DbContext);

  // Check if user wants to remember preferences and fill in state accordingly
  const getInitialState = () => {
    const preferencesFromStorage =
      logsStorageManager.retrievePreferencesFromStorage();

    if (!preferencesFromStorage) {
      logsStorageManager.replaceLogsInStorage(new Map<string, Log[]>());
      logsStorageManager.replaceActiveFileInStorage('');
      logsStorageManager.replaceSearchedTermInStorage('');
    }

    return preferencesFromStorage
      ? {
          logs: logsStorageManager.retrieveLogsFromStorage(),
          activeFile: logsStorageManager.retrieveActiveFileFromStorage(),
          rememberPreferences: preferencesFromStorage,
          searchedTerm: logsStorageManager.retrieveSearchedTermFromStorage(),
          dbIsReady: false,
          fileNames: [],
        }
      : {
          logs: new Map<string, Log[]>(),
          activeFile: '',
          rememberPreferences: false,
          searchedTerm: '',
          dbIsReady: false,
          fileNames: [],
        };
  };

  const [state, dispatch] = useReducer(LogsReducer, getInitialState());

  // Hook that checks whether dbManager constructor is done initializing - needs to be pooled every x ms because isReady belongs to class and not DbState - the only argument of hook can be the manager instance
  useEffect(() => {
    // Poll the readiness status of IndexedDB every 100ms.
    const intervalId = setInterval(() => {
      if (dbContext.indexedDbStorageManager.getIsReady()) {
        dispatch({
          type: SET_DB_READY,
          payload: true,
        });
        // Stop polling once the database is ready.
        clearInterval(intervalId);
      }
    }, 100);
  }, [dbContext.indexedDbStorageManager]);

  // Hook that runs after db is done initialising and logsState has dbIsReady set to true - sets file names to whats stored in indexedDB
  useEffect(() => {
    if (state.dbIsReady) {
      dispatch({
        type: SET_FILE_NAMES,
        payload: dbContext.indexedDbStorageManager.getAllTableNames(),
      });
    }
  }, [state.dbIsReady]);

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
        dbIsReady: state.dbIsReady,
        fileNames: state.fileNames,
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
