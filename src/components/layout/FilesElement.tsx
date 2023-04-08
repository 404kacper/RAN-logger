import { useContext, useState, Fragment } from "react";
import { CloseButton } from "react-bootstrap";

import LogsContext from '../../context/logs/logsContext';

interface FilesElementProps {
    fileName: string
    onClickDelete: () => void;
}

const FilesElement: React.FC<FilesElementProps> = ({fileName, onClickDelete}) => {

    const logsContext = useContext(LogsContext);

    const [isActive, setIsActive] = useState(() => {
        if (logsContext.activeFile === fileName) {
            return true;
        }
        else {
            return false;
        }
    });

    const handleOnClick = () => {
        logsContext.setActiveFile(fileName);
        setIsActive(true);
        const rememberActiveFile = logsContext.rememberPreferences;
        if (rememberActiveFile !== null && rememberActiveFile) {
            logsContext.logsStorageManager.replaceActiveFileInStorage(fileName);
        }
    }

    return (
        <Fragment>
            {isActive ? (
            <div className="filesElement-active rounded mt-2" style={{width: '6vw'}}>
                <div className="d-flex justify-content-between">
                    <div className="text-truncate" style={{padding: '4px'}}>{fileName}</div>
                    <CloseButton style={{paddingTop: '0.6em', paddingRight: '0.7em', paddingLeft: '0em'}} onClick={onClickDelete}/>
                </div>
            </div>
            ) : (
            <div className="filesElement rounded mt-2" style={{width: '6vw'}} onClick={handleOnClick}>
                <div className="d-flex justify-content-between">
                    <div className="text-truncate" style={{padding: '4px'}}>{fileName}</div>
                    <CloseButton style={{paddingTop: '0.6em', paddingRight: '0.7em', paddingLeft: '0em'}} onClick={onClickDelete}/>
                </div>
            </div>
            )}
        </Fragment>
    );
}

export default FilesElement;