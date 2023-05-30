import IndexedDbStorageManager from "../../../utils/manager/IndexedDbManager";

// The structure of state - values being passed between components
export interface State {
    dbIsReady: boolean
    indexedDbStorageManager: IndexedDbStorageManager;
  }