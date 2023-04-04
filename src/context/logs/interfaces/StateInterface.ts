import Log from '../../../utils/interpreter/Log'; 

// The structure of state - values being passed between components
export interface State {
    logs: Map <string, Log[]>;
  }