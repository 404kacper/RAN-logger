import {
  SET_ACTIVE_FILE,
  SET_REMEMBER_PREFERENCES,
  SET_SEARCHED_TERM,
  SET_DB_READY,
  SET_FILE_NAMES,
  ADD_FILE_NAME,
  DELETE_FILE_NAME,
} from '../types';

import { State } from './interfaces/StateInterface';
import { Action } from './interfaces/ActionInterface';

const logsReducer = (state: State, action: Action) => {
  // Used to update logs state everytime App component is reloaded
  switch (action.type) {
    case SET_ACTIVE_FILE:
      return {
        ...state,
        activeFile: action.payload,
      };
    case SET_REMEMBER_PREFERENCES:
      return {
        ...state,
        rememberPreferences: action.payload,
      };
    case SET_SEARCHED_TERM:
      return {
        ...state,
        searchedTerm: action.payload,
      };
    case SET_DB_READY:
      return {
        ...state,
        dbIsReady: action.payload,
      };
    case SET_FILE_NAMES:
      return {
        ...state,
        fileNames: action.payload,
      };
    case ADD_FILE_NAME:
      return {
        ...state,
        fileNames: [...state.fileNames, action.payload],
      };
    case DELETE_FILE_NAME:
      return {
        ...state,
        fileNames: state.fileNames.filter(
          (fileName) => fileName !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default logsReducer;
