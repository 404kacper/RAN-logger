import { useContext, useState, Fragment, useEffect } from "react";
import { CloseButton } from "react-bootstrap";

import LogsContext from '../../context/logs/logsContext';

interface FilesElementProps {
    fileName: string
    onClickDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FilesElement: React.FC<FilesElementProps> = ({fileName, onClickDelete}) => {

    const logsContext = useContext(LogsContext);

    const [isActive, setIsActive] = useState(false);

    const handleOnClick = () => {
        logsContext.logsStorageManager.replaceActiveFileInStorage(fileName);
        logsContext.setActiveFile(fileName);
    }

    useEffect(() => {
        // Setting active styles on current session
        if (logsContext.activeFile === fileName) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
        // Storage management on refresh - currently always stores activeFile whenever pressed thus it needs to be reseted whenever preferences aren't set
        if (!logsContext.rememberPreferences) {
            logsContext.logsStorageManager.replaceActiveFileInStorage("");
        }
    }, [logsContext.activeFile, logsContext.logsStorageManager, logsContext.rememberPreferences , fileName])

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