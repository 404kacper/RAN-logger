import React, {ChangeEvent, useContext, useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import LogsContext from '../../context/logs/logsContext';

const InputForm: React.FC = () => {
  const logsContext = useContext(LogsContext)

  // Value initialized to global state in it's file - logsState
  const placeholderText: string = logsContext.user;


  // setText is the name of function that is used to update local state - useState is the hook - ASYNCHRONOUS OPERATION
  const [text, setText] = useState(placeholderText);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    logsContext.updateUserData(e.target.value)
  }

  return (
    <div>
      <Form.Label className='mt-5'>Testowe pole tekstowe:</Form.Label>
      <Form.Control type="text" onChange={onChange} defaultValue={placeholderText}/>
      <Form.Text >
        Wpisz tekst powyżej a następnie naciśnij przycisk aby sprawdzić poprawność działania React Context API.
        <br/>
        <br/>
        Tekst z local state: {text}
      </Form.Text>
    </div>
  );
}

export default InputForm;