import { useContext, useState, Fragment, useEffect } from 'react';
import { CloseButton } from 'react-bootstrap';

import LogsContext from '../../context/logs/logsContext';
import DbContext from '../../context/db/dbContext';

interface FilesElementProps {
  fileName: string;
}

const FilesElement: React.FC<FilesElementProps> = ({ fileName }) => {
  const logsContext = useContext(LogsContext);
  const dbContext = useContext(DbContext);

  const { localStorageManager, activeFile } = logsContext;
  const { indexedDbStorageManager } = dbContext;

  const [isActive, setIsActive] = useState(false);

  const handleOnClick = () => {
    logsContext.setActiveFile(fileName);
    localStorageManager.replaceActiveFileInStorage(fileName);
  };

  const handleOnClickDelete = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Stops propagation so that handleOnClick doesn't execute - this can be tricky because handle is async function so debugging is hard in case something breaks in the future
    event.stopPropagation();
    // Account for changes in ui - related to activeFile - activeFile in state and Local Storage
    if (activeFile == fileName) {
      localStorageManager.replaceActiveFileInStorage('');
      logsContext.setActiveFile('');
    }
    // Remove records but preserve table
    await indexedDbStorageManager.deleteTableByFileName(fileName);
    // Account for changes in ui - fileNames list
    logsContext.removedLogFromDb(fileName);
  };

  useEffect(() => {
    // Setting active styles on current session
    if (activeFile === fileName) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    // Hook needs to re-run everytime activeFile changes - so there isn't a situation where after refresh two elemnts hold active file status
  }, [activeFile]);

  return (
    <Fragment>
      {isActive ? (
        <div
          className='filesElement-active rounded mt-2'
          onClick={handleOnClick}
        >
          <div className='d-flex justify-content-between'>
            <div className='text-truncate' style={{ padding: '4px' }}>
              {fileName}
            </div>
            <CloseButton
              style={{
                paddingTop: '0.6em',
                paddingRight: '0.7em',
                paddingLeft: '0em',
              }}
              className='btn-close btn-close-white'
              onClick={(e) => handleOnClickDelete(e)}
            />
          </div>
        </div>
      ) : (
        <div
          className='filesElement rounded mt-2'
          onClick={handleOnClick}
        >
          <div className='d-flex justify-content-between'>
            <div className='text-truncate' style={{ padding: '4px' }}>
              {fileName}
            </div>
            <CloseButton
              style={{
                paddingTop: '0.6em',
                paddingRight: '0.7em',
                paddingLeft: '0em',
              }}
              className='btn-children'
              onClick={(e) => handleOnClickDelete(e)}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default FilesElement;
