import {
  UPDATE_USER
} from '../types';

import {State} from "./StateInterface";
import {Action} from "./ActionInterface";

const logsReducer = (state: State, action: Action) => {
  switch (action.type) {
      case UPDATE_USER:
        return {
          // Copy state
          ...state,
          // Assign new payload - update state
          user: action.payload
        };
    default:
      return state;
  }
};

export default logsReducer;