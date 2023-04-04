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
            {/* ToDo: update logs state from dropzone component: on file added/removed - useEffect with files dependancy array */}
            {/* Will be little different since there is no need to retrieve them from local storage - watchout for double update (when files get updated from local storage) */}
            <Route path='/' element={<Home/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
      </Container>
    </Router>
  </LogsState>
  );
};

export default App;

