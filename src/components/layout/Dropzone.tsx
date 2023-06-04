import { Fragment, useContext } from 'react';
import DropzoneIcon from '../../assets/DropzoneIcon';
import LogInterpreter from '../../utils/interpreter/LogInterpreter';
import LogsContext from '../../context/logs/logsContext';
import DbContext from '../../context/db/dbContext';
import Log from '../../utils/interpreter/Log';

import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
} from 'react-dropzone';

const Dropzone: React.FC = () => {
  const logsContext = useContext(LogsContext);
  const dbContext = useContext(DbContext);

  // method to handle file dropping
  const handleDrop = (acceptedFiles: File[]) => {
    // check if there are duplicates - only if there is something in context.fileNames
    if (logsContext.fileNames.length > 0) {
      const existingFileNames: string[] = logsContext.fileNames;

      // check if any of the dropped files already exist
      const duplicates = acceptedFiles.filter((file) =>
        existingFileNames.includes(file.name)
      );

      if (duplicates.length > 0) {
        // if there are duplicates, set the error state with a message
        logsContext.addError(
          `Error: these files already exist in database: ${duplicates
            .map((file) => file.name)
            .join(', ')} - canceling upload.`
        );
        return;
      }
    }

    interface FileLog {
      fileName: string;
      logs: Log[];
    }

    // Function that iterates through all files and returns array of promises that can be iterated through
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
          // Only if there are logs in file - implaction from DbManager implementation - only non-empty tables will be displayed
          if (logs.length > 0) {
            // Add log with name to db
            await dbContext.indexedDbStorageManager.addLogs(logs, fileName);
            // Store name in context to display
            logsContext.addedLogToDb(fileName);
          }
        }
      })
      .catch((error) => {
        console.error('Error reading files:', error);
      });
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
    <Fragment>
      <div
        style={{ border: '3px solid' }}
        className='d-flex flex-column border-dark m-2 mt-3 bg-light align-items-center p-2'
        {...getRootProps()}
      >
        <DropzoneIcon width={'3vw'} height={'3vh'} />
        <div>
          <input {...getInputProps()} />
          <h6 className='text-center'>Drag and drop file or click to upload</h6>
        </div>
      </div>
    </Fragment>
  );
};

export default Dropzone;
