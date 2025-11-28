import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import './Header.css';

const Header = ({ progress }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="header-title">Tech Tracker</h1>
          <p className="header-subtitle">Персональный трекер освоения технологий</p>
          <ProgressBar progress={progress} />
        </div>
      </div>
    </header>
  );
};

export default Header;