import React, {ChangeEvent, useContext, useState} from 'react';
import Form from 'react-bootstrap/Form';
import LogsContext from '../../context/logs/logsContext';

const InputForm: React.FC = () => {
  const logsContext = useContext(LogsContext)
  const placeholderText: string = logsContext.user;


  // setText is the name of function that is used to update local state
  const [text, setText] = useState(placeholderText);
  
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    logsContext.updateUserData(text);
  }

  return (
    <div>
      <Form.Label className='mt-5'>Testowe pole tekstowe:</Form.Label>
      <Form.Control type="text" onChange={onChange} value={placeholderText}/>
      <Form.Text >
        Wpisz tekst powyżej a następnie naciśnij przycisk aby sprawdzić poprawność działania React Context API.
      </Form.Text>
    </div>
  );
}

export default InputForm;