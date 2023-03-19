import React, {useContext, useState} from 'react';
import LogsContext from '../../context/logs/logsContext';


import "bootstrap/dist/css/bootstrap.min.css"
import {Button, Modal} from "react-bootstrap"

const ModalButton: React.FC = () => {
  const logsContext = useContext(LogsContext);
  
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <Button onClick={handleShowModal} className='mt-3'>Sprawdź</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nagłówek powiadomienia</Modal.Title>
        </Modal.Header>
        {/* Here the value updated by InputForm is being actually used with Context API */}
        <Modal.Body>{logsContext.user}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Zamknij
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalButton;

