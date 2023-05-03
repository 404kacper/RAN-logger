import {
  SET_LOGS,
  REMOVE_LOG,
  ADD_LOG,
  SET_ACTIVE_FILE,
  SET_REMEMBER_PREFERENCES,
  SET_SEARCHED_TERM,
} from "../types";

import { State } from "./interfaces/StateInterface";
import { Action } from "./interfaces/ActionInterface";

const logsReducer = (state: State, action: Action) => {
  // Used to update logs state everytime App component is reloaded
  switch (action.type) {
    case SET_LOGS:
      return {
        // Copy state
        ...state,
        // Assign new payload - update state
        logs: action.payload,
      };
    case REMOVE_LOG:
      state.logs.delete(action.payload);
      return {
        ...state,
      };
    case ADD_LOG:
      return {
        ...state,
        logs: new Map([
          ...Array.from(state.logs),
          [action.payload[0], action.payload[1]],
        ]),
      };
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
    default:
      return state;
  }
};

export default logsReducer;
