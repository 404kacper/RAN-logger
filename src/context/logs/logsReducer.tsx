import {
  SET_LOGS,
  SET_ACTIVE_FILE,
  SET_REMEMBER_PREFERENCES
} from '../types';

import {State} from "./interfaces/StateInterface";
import {Action} from "./interfaces/ActionInterface";

const logsReducer = (state: State, action: Action) => {
  // Used to update logs state everytime App component is reloaded 
  switch (action.type) {
      case SET_LOGS:
        return {
          // Copy state
          ...state,
          // Assign new payload - update state
          logs: action.payload
        };
      case SET_ACTIVE_FILE:
        return {
          ...state,
          activeFile: action.payload
        }
      case SET_REMEMBER_PREFERENCES:
        return {
          ...state,
          rememberPreferences: action.payload
        }
    default:
      return state;
  }
};

export default logsReducer;