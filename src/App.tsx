import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Solve from './solve/solve';
import Scores from './scores/scores';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <Routes>
          <Route path="/solve" element={<Solve />}></Route>
          <Route path="/scores" element={<Scores />}></Route>
          <Route path="/" element={<Solve />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
