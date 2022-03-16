import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onClickSolve = () => navigate('solve');
  const onClickScores = () => navigate('scores');

  return (
    <div className="navbar">
      <div className="navbar-header">COGNIZANT CHALLENGE</div>
      <div className="navbar-btns">
        <div
          className={`navbar-btn solve ${
            pathname !== '/scores' ? 'selected' : ''
          }`}
          onClick={onClickSolve}
        >
          SOLVE
        </div>
        <div
          className={`navbar-btn scores-btn ${
            pathname === '/scores' ? 'selected' : ''
          }`}
          onClick={onClickScores}
        >
          TOP-3
        </div>
      </div>
    </div>
  );
};

export default Navbar;
