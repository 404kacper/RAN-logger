class LogsStorageManager {
  storagePrefix: string = "samsung-ran-logger-";

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

  replaceActiveFileInStorage = (activeFileName: string) => {
    localStorage.setItem(
      this.storagePrefix + "activeFile",
      JSON.stringify(activeFileName)
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
