import { useReducer, useEffect } from 'react';
import DbContext from './dbContext';
import DbReducer from './dbReducer';
import { SET_DB_READY } from '../types';

import IndexedDbStorageManager from '../../utils/manager/IndexedDbManager';

const DbState = (props: any) => {
  const initialState = {
    dbIsReady: false,
    indexedDbStorageManager: new IndexedDbStorageManager(),
  };

  const [state, dispatch] = useReducer(DbReducer, initialState);

  useEffect(() => {
    // Poll the readiness status of IndexedDB every 100ms.
    const intervalId = setInterval(() => {
      if (state.indexedDbStorageManager.getIsReady()) {
        dispatch({
          type: SET_DB_READY,
          payload: true,
        });
        // Stop polling once the database is ready.
        clearInterval(intervalId);
      }
    }, 100);
  }, [state.indexedDbStorageManager]);

  return (
    <DbContext.Provider
      value={{
        dbIsReady: state.dbIsReady,
        indexedDbStorageManager: state.indexedDbStorageManager,
      }}
    >
      {props.children}
    </DbContext.Provider>
  );
};

export default DbState;
