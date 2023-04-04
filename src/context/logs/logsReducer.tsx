import {
  GET_LOGS
} from '../types';

import {State} from "./interfaces/StateInterface";
import {Action} from "./interfaces/ActionInterface";

const logsReducer = (state: State, action: Action) => {
  // Used to update logs state everytime App component is reloaded 
  switch (action.type) {
      case GET_LOGS:
        return {
          // Copy state
          ...state,
          // Assign new payload - update state
          logs: action.payload
        };
    default:
      return state;
  }
};

export default logsReducer;