import { CloseButton } from "react-bootstrap";

interface FilesElementProps {
    fileName: string
    onClickDelete: () => void;
}

const FilesElement: React.FC<FilesElementProps> = ({fileName, onClickDelete}) => {

    return (
        <div className="filesElement rounded mt-2" style={{width: '6vw'}}>
            <div className="d-flex justify-content-between">
                <div className="text-truncate" style={{padding: '4px'}}>{fileName}</div>
                <CloseButton style={{paddingTop: '0.6em', paddingRight: '0.7em', paddingLeft: '0em'}} onClick={onClickDelete}/>
            </div>
        </div>
    );
}

export default FilesElement;