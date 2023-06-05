import { State } from './interfaces/StateInterface';
import { Action } from './interfaces/ActionInterface';

const dbReducer = (state: State, action: Action) => {
  // Used to update logs state everytime App component is reloaded
  switch (action.type) {
    default:
      return state;
  }
};

export default dbReducer;
