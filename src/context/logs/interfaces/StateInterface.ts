// The structure of state - values being passed between components
export interface State {
  logs: Array<string>;
  activeFile: string;
  searchedTerm: string;
  dbIsReady: boolean;
  fileNames: string[];
  errors: string[];
}
