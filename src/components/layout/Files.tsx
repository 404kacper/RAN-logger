import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Form, Alert, Container } from 'react-bootstrap';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

import LogsContext from '../../context/logs/logsContext';
import FilesElement from './FilesElement';
import Dropzone from './Dropzone';
import FileIcon from '../../assets/FileIcon';
import Log from '../../utils/interpreter/Log'

interface FilesProps {
  collapsed: boolean;
}

const Files: React.FC<FilesProps> = ({collapsed}) => {
  // CONTEXT
  const logsContext = useContext(LogsContext);

  // LOCAL STATES:
  const storagePrefix: string = "samsung-ran-logger-"

  // state to set and display errors
  const [error, setError] = useState<string>("");

  // initialize files state with data from localStorage
  const [files, setFiles] = useState<File[]>(() => {
    // Part responsible for setting files back to [] whenever preferences is unchecked
    if (logsContext.rememberPreferences) {
      const storedEntries = JSON.parse(localStorage.getItem(storagePrefix + 'files') || '[]') as [string, string][];
      const storedFiles = storedEntries.map(([name, data]) => new File([data], name));
      return storedFiles;
    } else {
      return [];
    }
  });

  // hook that executes on every update of files state
  // the idea of this hook is to only store filesMap in localStorage once for each files state change
  useEffect(() => {
    const filesMap = new Map<string, string>();
  
    // array of promises is returned - each promise represents one file reading 
    Promise.all(files.map(file => {
        // creation of Promise instances for each file
      return new Promise<void>((resolve, reject) => {
        // each file gets instance of FileReader & onload method executes after readAsText(file) is called to set filesMap entries
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result !== undefined) {
            filesMap.set(file.name, e.target?.result as string);
            resolve();
          } else {
            reject();
          }
        };
        reader.readAsText(file);
      });
    }))
    .then(() => {
      // This part can perhaps be further simplified and refactored (change to files state would also be needed) - for now that is the workflow
      // Saves files to local storage - simplest format( map of strings ) - key is file name value is contents of file 
      logsContext.logsStorageManager.replaceLogsInStorage(filesMap);
      // Retrival of map from local storage and it's further parsing with LogsStorageManager to individual Log objects --> new Map of key: file name and value: array of Log objects
      const stateMap: Map<string, Log[]> = logsContext.logsStorageManager.retrieveLogsFromStorage();
      // Store new map in local storage
      logsContext.setStoredLogs(stateMap);
    })
    .catch(() => {
      console.error('Error reading files');
    });
    // Only do above when files state changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  // method to handle user checkbox preferences
  const handleRememberFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const decision = e.target.checked;
    logsContext.logsStorageManager.replacePreferencesInStorage(decision);
    logsContext.setPreferences(decision);
  };

  // method to handle file dropping
  const handleDrop = (acceptedFiles: File[]) => {
    // check if a file with the same name exists
    const existingFileNames = files.map((file) => file.name);

    // check if any of the dropped files already exist
    const duplicates = acceptedFiles.filter((file) =>
      existingFileNames.includes(file.name)
    );

    if (duplicates.length > 0) {
        // if there are duplicates, set the error state with a message
        setError(`Błąd: Te pliki już istnieją i nie zostały dodane: ${duplicates.map((file) => file.name).join(", ")}`);
            // clear error message after 4 seconds
        setTimeout(() => {
            setError("");
        }, 4000);
        return;
    }

    // add new files to the state
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  // method to handle file deletion
  const handleDelete = (fileToDelete: File, event: React.MouseEvent<HTMLButtonElement>) => {
    setFiles((prev) => prev.filter((file) => file !== fileToDelete));
    logsContext.logsStorageManager.replaceActiveFileInStorage("");
    logsContext.setActiveFile("");
    // Stops the event on button that was clicked - so that the parent element doesn't try setting state when inactive element is selected
    event.stopPropagation();
  };

  // render error message if error state is not empty
  const renderError = () => {
     if (error !== "") {
        return (
            <Alert variant='danger' className='mt-3'>
                {error}
            </Alert>
        );
    } else {
        return null;
    }
  };

  // Props to assign drag n' drop functionality to html elements
  const { getRootProps, getInputProps }: {
    getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
    getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  } = useDropzone({ onDrop: handleDrop });

  return (
    <Container className='py-2 files' style={{backgroundColor:"rgb(236,236,236"}}>
      {collapsed ? null : (
        <Fragment>
            <div className="d-flex justify-content-start mb-2">
            <FileIcon/>
            <h5 className='align-self-center mb-0 mx-2'>Files</h5>
          </div>
          <Dropzone getRootProps={getRootProps} getInputProps={getInputProps}/>
          {renderError()}
          <Form.Group controlId="formRemember" className='mt-2'>
              <Form.Check type="checkbox" label="Remember files" checked={logsContext.rememberPreferences} onChange={handleRememberFiles} style={{fontSize: '0.9rem'}}/>
          </Form.Group>
          {files.length > 0 && (
              <Form.Group controlId="formFiles">
                  {/* Scroll still needs to be stylized -  */}
                  <div style={{height: '30vh', overflowY: 'auto', overflowX: 'hidden'}}>
                    {files.map((file) => (
                      <FilesElement key={file.name} fileName={file.name} onClickDelete={(event) => handleDelete(file, event)}/>
                    ))}
                  </div>
                </Form.Group>
          )}
        </Fragment>
      )}
    </Container>
  );
}

export default Files;
