import React, { useReducer } from 'react';
import LogsContext from './logsContext';
import LogsReducer from './logsReducer';

import {
  UPDATE_USER
} from '../types';

const LogsState = (props: any) => {

  const initialState = {
    user: "Początkowy tekst powiadomienia."
  };

  const [state, dispatch] = useReducer(LogsReducer, initialState);

  // Search Users
  const updateUserData = (text: string) => {
    dispatch({
      type: UPDATE_USER,
      payload: text
    });
  };

  return (
    <LogsContext.Provider
      value={{
        user: state.user,
        updateUserData,
      }}
    >
      {props.children}
    </LogsContext.Provider>
  );
};

export default LogsState;