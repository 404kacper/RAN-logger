import DbContext from './dbContext';
// Unused for now since indexedDbStorageManager implementation implies that it cannot re-render --> so that db doesn't reset with each object initialization
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DbReducer from './dbReducer';

import IndexedDbStorageManager from '../../utils/manager/IndexedDbManager';

const DbState = (props: any) => {
  const indexedDbStorageManager = new IndexedDbStorageManager();

  return (
    <DbContext.Provider
      value={{
        indexedDbStorageManager,
      }}
    >
      {props.children}
    </DbContext.Provider>
  );
};

export default DbState;
