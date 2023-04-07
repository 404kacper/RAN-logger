import DropzoneIcon from "../../assets/DropzoneIcon"

interface DropzoneProps {
    getRootProps: any;
    getInputProps: any;
}

const Dropzone: React.FC<DropzoneProps> = ({ getRootProps, getInputProps}) => {
    return (
        <div style={{border: '3px solid'}} className="d-flex flex-column border-dark m-2 mt-3 bg-light align-items-center p-2" {...getRootProps()}>
            <DropzoneIcon width={'3vw'} height={'3vh'}/>
            <div>
                <input {...getInputProps()} />
                <h6 className='text-center'>Drag and drop file or click to upload</h6>
            </div>
        </div>
    )
}

export default Dropzone