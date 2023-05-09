import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
} from 'react';
import { Form, Alert, Container } from 'react-bootstrap';
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
} from 'react-dropzone';

import LogInterpreter from '../../utils/interpreter/LogInterpreter';
import LogsContext from '../../context/logs/logsContext';
import DbContext from '../../context/db/dbContext';
import FilesElement from './FilesElement';
import Dropzone from './Dropzone';
import FileIcon from '../../assets/FileIcon';
import Log from '../../utils/interpreter/Log';

import { useLiveQuery } from 'dexie-react-hooks';

interface FilesProps {
  collapsed: boolean;
}

const Files: React.FC<FilesProps> = ({ collapsed }) => {
  const logsContext = useContext(LogsContext);
  const dbContext = useContext(DbContext);

  // state to set and display errors
  const [error, setError] = useState<string>('');
  // dexie states
  const tableNames = useLiveQuery(async () => {
    console.log(await dbContext.indexedDbStorageManager.getAllTableNames());
    return await dbContext.indexedDbStorageManager.getAllTableNames();
  }, [dbContext.indexedDbStorageManager])

  // hook that runs after every logs state update to repalce values in local storage
  useEffect(() => {
    // Check if it's the initial render
    logsContext.logsStorageManager.replaceLogsInStorage(logsContext.logs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logsContext.logs]);

  // method to handle user checkbox preferences
  const handleRememberFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const decision = e.target.checked;
    logsContext.logsStorageManager.replacePreferencesInStorage(decision);
    logsContext.setPreferences(decision);
  };

  // method to handle file dropping
  const handleDrop = (acceptedFiles: File[]) => {
    // check if there are duplicates - only when there are files inside logs state
    if (logsContext.logs.length > 0) {
      const existingFileNames: string[] = logsContext.logs.keys;

      // check if any of the dropped files already exist
      const duplicates = acceptedFiles.filter((file) =>
        existingFileNames.includes(file.name)
      );

      if (duplicates.length > 0) {
        // if there are duplicates, set the error state with a message
        setError(
          `Błąd: Te pliki już istnieją i nie zostały dodane: ${duplicates
            .map((file) => file.name)
            .join(', ')}`
        );
        // clear error message after 4 seconds
        setTimeout(() => {
          setError('');
        }, 4000);
        return;
      }
    }

    interface FileLog {
      fileName: string;
      logs: Log[];
    }

    // Function that iterates through all files and returns promise that represents one file reading
    const readFiles: Promise<FileLog>[] = acceptedFiles.map((file) => {
      return new Promise<FileLog>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const buffer = e.target?.result as ArrayBuffer;
          if (buffer) {
            const decoder = new TextDecoder('utf-8');
            const content = decoder.decode(buffer);
            const interpreter = new LogInterpreter(content);
            // Each resolved promise represents object with key of file name and value of log objects array
            resolve({ fileName: file.name, logs: interpreter.parseLogs() });
          } else {
            reject(new Error('Failed to read file buffer.'));
          }
        };
        reader.readAsArrayBuffer(file);
      });
    });

    // Wait until all promises are resolved then update state with values of each promise object
    // Reading is still much faster than storing but it's resonable now
    Promise.all<FileLog>(readFiles)
      .then(async (fileLogs) => {
        // Iterate through each promise
        for (const { fileName, logs } of fileLogs) {
          await dbContext.indexedDbStorageManager.addLogs(logs, fileName);
        }
      })
      .catch((error) => {
        console.error('Error reading files:', error);
      });
  };

  // method to handle file deletion
  const handleDelete = async (
    keyToDelete: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (logsContext.activeFile === keyToDelete) {
      logsContext.logsStorageManager.replaceActiveFileInStorage('');
      logsContext.setActiveFile('');
    }

    // Remove records but preserve table
    await dbContext.indexedDbStorageManager.deleteByFileName(keyToDelete);
    // Stops the event on button that was clicked - so that the parent element doesn't try setting state when inactive element is selected
    event.stopPropagation();
  };

  // render error message if error state is not empty
  const renderError = () => {
    if (error !== '') {
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
  const {
    getRootProps,
    getInputProps,
  }: {
    getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps;
    getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
  } = useDropzone({ onDrop: handleDrop });

  return (
    <Container className='py-2 files'>
      {collapsed ? null : (
        <Fragment>
          <div className='d-flex justify-content-start mb-2'>
            <FileIcon />
            <h5 className='align-self-center mb-0 mx-2'>Files</h5>
          </div>
          <Dropzone getRootProps={getRootProps} getInputProps={getInputProps} />
          {renderError()}
          <Form.Group controlId='formRemember' className='mt-2'>
            <Form.Check
              type='checkbox'
              label='Remember files'
              checked={logsContext.rememberPreferences}
              onChange={handleRememberFiles}
              style={{ fontSize: '0.9rem' }}
            />
          </Form.Group>
          {tableNames && tableNames.length > 0 && (
            <Form.Group controlId='formFiles'>
              {/* Scroll still needs to be stylized -  */}
              <div
                style={{
                  height: '30vh',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                {tableNames.map((fileName: string) => (
                  <FilesElement
                    key={fileName}
                    fileName={fileName}
                    onClickDelete={(event) => handleDelete(fileName, event)}
                  />
                ))}
              </div>
            </Form.Group>
          )}
        </Fragment>
      )}
    </Container>
  );
};

export default Files;
