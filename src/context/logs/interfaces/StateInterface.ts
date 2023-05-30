import Log from '../../../utils/interpreter/Log';

// The structure of state - values being passed between components
export interface State {
  logs: Map<string, Log[]>;
  activeFile: string;
  rememberPreferences: boolean;
  searchedTerm: string;
  dbIsReady: boolean;
  fileNames: string[];
}
