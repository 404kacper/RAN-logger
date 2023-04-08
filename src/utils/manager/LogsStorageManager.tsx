import Log from '../../utils/interpreter/Log';
import LogInterpreter from '../../utils/interpreter/LogInterpreter';

class LogsStorageManager {
    storagePrefix: string = "samsung-ran-logger-"

    // Helper function to cleanup the code in state and make it reusable in components - parses JSON object stored in local storage - to set global state
    retrieveLogsFromStorage = (): Map <string, Log[]>  => {
        const storagePrefix: string = "samsung-ran-logger-";
        const storageObject = JSON.parse(localStorage.getItem(storagePrefix + 'files') as string);
        const storedLogs = new Map<string, Log[]>();
    
        if (storageObject != null) {
        // For each file interpeter creates key: value pair to store objects - file name with extension is used to retrieve the Log objects
        storageObject.forEach((logFile: string[]) => {
            const fileName = logFile[0];
            const fileContents = logFile[1];
        
            const logInterpreter = new LogInterpreter(fileContents);
        
            const logObjects = logInterpreter.parseLogs();
            storedLogs.set(fileName, logObjects);
        })
        
        return storedLogs;
        } else {
        return storedLogs;
        }
    }

  // Helper to retrieve active files from local storage and initialize global state
  retrieveActiveFileFromStorage = (): string  => {
    const storagePrefix: string = "samsung-ran-logger-";
    const storageObject = JSON.parse(localStorage.getItem(storagePrefix + 'activeFile') as string);
    const defaultActiveFileName: string = "";

    if (storageObject != null ) {
      return storageObject;
    } else {
      return defaultActiveFileName;
    }
  }

  // Helper to retrieve references from local storage and initialize global state
  retrievePreferencesFromStorage = (): boolean  => {
    const storagePrefix: string = "samsung-ran-logger-";
    const storageObject = JSON.parse(localStorage.getItem(storagePrefix + 'rememberFiles') as string);
    const defaultPreferenceValue: boolean = false;

    if (storageObject != null ) {
      return Boolean(storageObject);
    } else {
      return defaultPreferenceValue;
    }
  }

  replaceLogsInStorage = () => {

  }

  replaceActiveFileInStorage = (activeFileName: string) => {
    localStorage.setItem(this.storagePrefix + 'activeFile', JSON.stringify(activeFileName));
  }

  replacePreferencesInStorage = () => {

  }


}

export default LogsStorageManager;
