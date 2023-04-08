import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Form, Alert, Container } from 'react-bootstrap';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

import LogsContext from '../../context/logs/logsContext';
import FilesElement from './FilesElement';
import Dropzone from './Dropzone';
import FileIcon from '../../assets/FileIcon';

interface FilesProps {
  collapsed: boolean;
}

const Files: React.FC<FilesProps> = ({collapsed}) => {
  // CONTEXT
  const logsContext = useContext(LogsContext);

  // LOCAL STATES:
  const storagePrefix: string = "samsung-ran-logger-"

  // state to retrieve and store user preferences
  const [rememberFiles, setRememberFiles] = useState<boolean>(() => {
    // retrieve the value that was set in local storage as initial value for the state
    const storedValue = localStorage.getItem(storagePrefix + 'rememberFiles');
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });

  // initialize files state with data from localStorage
  const [files, setFiles] = useState<File[]>(() => {
    // Part responsible for setting files back to [] whenever rememberFiles is unchecked in local storage
    if (rememberFiles) {
      // same as above but for files state
      const storedEntries = JSON.parse(localStorage.getItem(storagePrefix + 'files') || '[]') as [string, string][];
      const storedFiles = storedEntries.map(([name, data]) => new File([data], name));
      return storedFiles;
    } else {
      return [];
    }
  });

  // state to set and display errors
  const [error, setError] = useState<string>("");

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
      // Saves files to local storage
      localStorage.setItem(storagePrefix + 'files', JSON.stringify(Array.from(filesMap.entries())));
      // Retrieves them and interprets - necessary to update global logs state
      const storedLogs = logsContext.logsStorageManager.retrieveLogsFromStorage();
      logsContext.setStoredLogs(storedLogs);
    })
    .catch(() => {
      console.error('Error reading files');
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  // method to handle user checkbox preferences
  const handleRememberFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setRememberFiles(value);
    localStorage.setItem(storagePrefix + 'rememberFiles', JSON.stringify(value));
    logsContext.setPreferences(value);
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
  const handleDelete = (fileToDelete: File) => {
    setFiles((prev) => prev.filter((file) => file !== fileToDelete));
    logsContext.setActiveFile("");
    localStorage.setItem(storagePrefix + 'activeFile', "");
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
    <Container className='py-2 files'>
      {collapsed ? null : (
        <Fragment>
            <div className="d-flex justify-content-start mb-2">
            <FileIcon/>
            <h5 className='align-self-center mb-0 mx-2'>Files</h5>
          </div>
          <Dropzone getRootProps={getRootProps} getInputProps={getInputProps}/>
          {renderError()}
          <Form.Group controlId="formRemember" className='mt-2'>
              <Form.Check type="checkbox" label="Zapamiętaj dodane pliki" checked={rememberFiles} onChange={handleRememberFiles} style={{fontSize: '0.9rem'}}/>
          </Form.Group>
          {files.length > 0 && (
              <Form.Group controlId="formFiles">
                  {/* Scroll still needs to be stylized -  */}
                  <div style={{height: '30vh', overflowY: 'auto', overflowX: 'hidden'}}>
                    {files.map((file) => (
                      <FilesElement key={file.name} fileName={file.name} onClickDelete={() => handleDelete(file)}/>
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
