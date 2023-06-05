import { useReducer } from 'react';
import DbContext from './dbContext';
import DbReducer from './dbReducer';

import IndexedDbStorageManager from '../../utils/manager/IndexedDbManager';

const DbState = (props: any) => {
  const initialState = {
    indexedDbStorageManager: new IndexedDbStorageManager(),
  };

  const [state, dispatch] = useReducer(DbReducer, initialState);

  return (
    <DbContext.Provider
      value={{
        indexedDbStorageManager: state.indexedDbStorageManager,
      }}
    >
      {props.children}
    </DbContext.Provider>
  );
};

export default DbState;
