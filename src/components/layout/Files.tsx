import React, { Fragment, useContext, useEffect } from 'react';
import { Form, Alert, Container } from 'react-bootstrap';
import LogsContext from '../../context/logs/logsContext';
import FilesElement from './FilesElement';
import Dropzone from './Dropzone';
import FileIcon from '../../assets/FileIcon';

interface FilesProps {
  collapsed: boolean;
}

const Files: React.FC<FilesProps> = ({ collapsed }) => {
  const logsContext = useContext(LogsContext);
  const { errors } = logsContext;

  // set tableNames to what's in context - default will be empty string array
  var tableNames = logsContext.fileNames;

  useEffect(() => {
    // Update fileNames whenever state changes
    tableNames = logsContext.fileNames;
  }, [logsContext.fileNames]);

  return (
    <Container
      className='py-2 files'
      style={{ backgroundColor: 'rgb(236,236,236' }}
    >
      {collapsed ? null : (
        <Fragment>
          <div className='d-flex justify-content-start mb-2'>
            <FileIcon width='24' height='24' />
            <h5 className='align-self-center mb-0 mx-2'>Files</h5>
          </div>
          <Dropzone />
          {/* {errors.length > 0 && renderError()} */}
          {errors.length > 0 &&
            errors.map((error: string, index: number) => (
              <Alert key={index} variant='danger' className='mt-3'>
                {error}
              </Alert>
            ))}
          {tableNames && tableNames.length > 0 && (
            <Form.Group controlId='formFiles'>
              {/* Scroll still needs to be stylized -  */}
              <div
                style={{
                  height: '100%',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                {tableNames.map((fileName: string) => (
                  <FilesElement key={fileName} fileName={fileName} />
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
