import { State } from "../logs/interfaces/StateInterface";
import { Action } from "../logs/interfaces/ActionInterface";

const dbReducer = (state: State, action: Action) => {
  // Used to update logs state everytime App component is reloaded
  switch (action.type) {
    default:
      return state;
  }
};

export default dbReducer;
