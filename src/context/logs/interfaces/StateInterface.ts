// The structure of state - values being passed between components
export interface State {
  activeFile: string;
  searchedTerm: string;
  dbIsReady: boolean;
  // Used to display file names from previous implementation
  // Now it will be a tree json from localStorage
  fileNames: string[];
  errors: string[];
}
