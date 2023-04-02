import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

import LogsState from './context/logs/LogsState';

import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

const App: React.FC = () => {
  return (
  <LogsState>
    <Router>
      {/* App and container classes there to be stylized */}
      <Container fluid className='App'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
      </Container>
    </Router>
  </LogsState>
  );
};

export default App;

