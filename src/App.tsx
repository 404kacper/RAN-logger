import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

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
      <div className='App'>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  </LogsState>
  );
};

export default App;

