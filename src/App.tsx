import React from 'react';
import { Container } from 'react-bootstrap';

import Home from './components/pages/Home';

import LogsState from './context/logs/LogsState';

import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

const App: React.FC = () => {

  return (
  <LogsState>
      {/* App and container classes there to be stylized */}
      <Container fluid className='App'>
        <Home/>
      </Container>
  </LogsState>
  );
};

export default App;

