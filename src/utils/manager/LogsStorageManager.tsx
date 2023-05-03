import Log from "../../utils/interpreter/Log";

class LogsStorageManager {
  storagePrefix: string = "samsung-ran-logger-";

  // Helper function to cleanup the code in state and make it reusable in components - parses JSON object stored in local storage and returns Map object
  retrieveLogsFromStorage = (): Map<string, Log[]> => {
    const storageObject = new Map<string, Log[]>(
      JSON.parse(localStorage.getItem(this.storagePrefix + "files") as string)
    );
    const storedLogs = new Map<string, Log[]>();

    if (storageObject !== null && storageObject !== undefined) {
      return storageObject;
    } else {
      return storedLogs;
    }
  };

  // Helper to retrieve active files from local storage and initialize global state
  retrieveActiveFileFromStorage = (): string => {
    const storageObject = JSON.parse(
      localStorage.getItem(this.storagePrefix + "activeFile") as string
    );
    const defaultActiveFileName: string = "";

    if (storageObject != null) {
      return storageObject;
    } else {
      return defaultActiveFileName;
    }
  };

  // Helper to retrieve references from local storage and initialize global state
  retrievePreferencesFromStorage = (): boolean => {
    const storageObject = JSON.parse(
      localStorage.getItem(this.storagePrefix + "rememberFiles") as string
    );
    const defaultPreferenceValue: boolean = false;

    if (storageObject != null) {
      return Boolean(storageObject);
    } else {
      return defaultPreferenceValue;
    }
  };

  // Helper similar to activeFile retrival
  retrieveSearchedTermFromStorage = (): string => {
    const storageObject = JSON.parse(
      localStorage.getItem(this.storagePrefix + "searchedTerm") as string
    );
    const defaultSearchedTerm: string = "";

    if (storageObject != null) {
      return storageObject;
    } else {
      return defaultSearchedTerm;
    }
  };

  replaceLogsInStorage = (mapOfFiles: Map<string, Log[]>) => {
    // console.log("Array from map passed to replaceLogsInStorage:")
    // console.log(mapOfFiles.keys());
    localStorage.setItem(
      this.storagePrefix + "files",
      JSON.stringify(Array.from(mapOfFiles.entries()))
    );
  };

  replaceActiveFileInStorage = (activeFileName: string) => {
    localStorage.setItem(
      this.storagePrefix + "activeFile",
      JSON.stringify(activeFileName)
    );
  };

  replacePreferencesInStorage = (preferencesDecision: boolean) => {
    localStorage.setItem(
      this.storagePrefix + "rememberFiles",
      JSON.stringify(preferencesDecision)
    );
  };

  replaceSearchedTermInStorage = (searchedTermString: string) => {
    localStorage.setItem(
      this.storagePrefix + "searchedTerm",
      JSON.stringify(searchedTermString)
    );
  };
}

export default LogsStorageManager;
