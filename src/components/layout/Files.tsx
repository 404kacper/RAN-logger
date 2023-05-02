import React, { Fragment, useState, useContext } from "react";
import { Form, Alert, Container } from "react-bootstrap";
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
} from "react-dropzone";

import LogInterpreter from "../../utils/interpreter/LogInterpreter";
import LogsContext from "../../context/logs/logsContext";
import FilesElement from "./FilesElement";
import Dropzone from "./Dropzone";
import FileIcon from "../../assets/FileIcon";
import Log from "../../utils/interpreter/Log";

interface FilesProps {
  collapsed: boolean;
}

const Files: React.FC<FilesProps> = ({ collapsed }) => {
  const logsContext = useContext(LogsContext);

  // state to set and display errors
  const [error, setError] = useState<string>("");

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
            .join(", ")}`
        );
        // clear error message after 4 seconds
        setTimeout(() => {
          setError("");
        }, 4000);
        return;
      }
    }

    // Add new log files to global logs state
    // For that create map to store file readings in format of key: file name, value: interpreted lines into Log object
    const filesMap = new Map<string, Log[]>();

    // array of promises is returned - each promise represents one file reading
    Promise.all(
      acceptedFiles.map((file) => {
        // creation of Promise instances for each file
        return new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          // For each file create key value pair in above map
          reader.onload = (e) => {
            const buffer = e.target?.result as ArrayBuffer;
            if (buffer) {
              const decoder = new TextDecoder("utf-8");
              const content = decoder.decode(buffer);
              const interpreter = new LogInterpreter(content);
              filesMap.set(file.name, interpreter.parseLogs());
              resolve();
            } else {
              console.error("buffer failed to read in handleDrop");
            }
          };
          // Call reader method to read file as string with behaviour defined above
          reader.readAsArrayBuffer(file);
        });
      })
    )
      .then(() => {
        // Saves files to local storage - as map (string, string) - key is file name, value is contents of file
        logsContext.logsStorageManager.replaceLogsInStorage(filesMap);
        // Store new map in local storage
        logsContext.setStoredLogs(filesMap);
      })
      .catch(() => {
        console.error("Error reading files");
      });
  };

  // method to handle file deletion
  const handleDelete = (
    keyToDelete: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // setFiles((prev) => prev.filter((file) => file !== fileToDelete));
    logsContext.logsStorageManager.replaceActiveFileInStorage("");
    logsContext.setActiveFile("");
    // Stops the event on button that was clicked - so that the parent element doesn't try setting state when inactive element is selected
    event.stopPropagation();
  };

  // render error message if error state is not empty
  const renderError = () => {
    if (error !== "") {
      return (
        <Alert variant="danger" className="mt-3">
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
    <Container className="py-2 files">
      {collapsed ? null : (
        <Fragment>
          <div className="d-flex justify-content-start mb-2">
            <FileIcon />
            <h5 className="align-self-center mb-0 mx-2">Files</h5>
          </div>
          <Dropzone getRootProps={getRootProps} getInputProps={getInputProps} />
          {renderError()}
          <Form.Group controlId="formRemember" className="mt-2">
            <Form.Check
              type="checkbox"
              label="Remember files"
              checked={logsContext.rememberPreferences}
              onChange={handleRememberFiles}
              style={{ fontSize: "0.9rem" }}
            />
          </Form.Group>
          {logsContext.logs.length > 0 && (
            <Form.Group controlId="formFiles">
              {/* Scroll still needs to be stylized -  */}
              <div
                style={{
                  height: "30vh",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                {Array.from(logsContext.logs.keys(), (fileName: string) => (
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
