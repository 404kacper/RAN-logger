import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, Alert } from 'react-bootstrap';
import { useDropzone, DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';

import LogsContext from '../../context/logs/logsContext';
import FilesElement from './FilesElement';

const DropzoneComponent: React.FC = () => {
  // CONTEXT
  const logsContext = useContext(LogsContext);

  // LOCAL STATES:
  const storagePrefix: string = "samsung-ran-logger-"

  // state to retrieve and store user preferences
  const [rememberFiles, setRememberFiles] = useState<boolean>(() => {
    const storedValue = localStorage.getItem(storagePrefix + 'rememberFiles');
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });

  // initialize files state with data from localStorage
  const [files, setFiles] = useState<File[]>(() => {
    if (rememberFiles) {
        const storedEntries = JSON.parse(localStorage.getItem(storagePrefix + 'files') || '[]') as [string, string][];
        const storedFiles = storedEntries.map(([name, data]) => new File([data], name));
        return storedFiles;
    } else {
        return [];
    }
  });

  // state to set and display errors
  const [error, setError] = useState<string>("");

  // another useEffect hook that executes on every update of files state
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
      const storedLogs = logsContext.retrieveLogsFromStorage();
      logsContext.getStoredLogs(storedLogs);
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
    <div>
      <Row>
        <Col>
          <div {...getRootProps()} className="dropzone mt-5">
            <input {...getInputProps()} />
            <p>Przeciągnij i upuść pliki na ten napis, lub kliknij na niego aby wybrać pliki.</p>
          </div>
          {renderError()} 
        </Col>
      </Row>
      {files.length > 0 && (
        <Row>
          <Col>
          <Form.Group controlId="formFiles">
              <Form.Label>Dodane Pliki:</Form.Label>
              {files.map((file) => (
                // <div key={file.name} className="mb-2">
                //   <span>{file.name}</span>
                //   <button onClick={() => handleDelete(file)} className="m-2">Usuń</button>
                // </div>
                <FilesElement fileName={file.name} onClickDelete={() => handleDelete(file)}></FilesElement>
              ))}
            </Form.Group>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <Form.Group controlId="formRemember" className='mt-2'>
            <Form.Check type="checkbox" label="Zapamiętaj dodane pliki" checked={rememberFiles} onChange={handleRememberFiles}/>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default DropzoneComponent;
