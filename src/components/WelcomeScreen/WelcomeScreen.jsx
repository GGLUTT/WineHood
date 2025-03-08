// src/pages/WelcomeScreen/WelcomeScreen.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleContinueBrowsing = () => {
    navigate('/');
  };

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="close-button">
          <button onClick={handleContinueBrowsing}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <h1 className="welcome-title">ЛАСКАВО ПРОСИМО У WINEHOOD</h1>
        
        <p className="welcome-description">
          Досліджуйте нові смаки, знаходите ідеальні поєднання та насолоджуйтесь кожним келихом.
        </p>
        
        <div className="welcome-buttons">
          <button 
            className="continue-button" 
            onClick={handleContinueBrowsing}
          >
            ПРОДОВЖИТИ ПЕРЕГЛЯД
          </button>
          
          <button 
            className="profile-button" 
            onClick={handleGoToProfile}
          >
            В ОСОБИСТИЙ КАБІНЕТ
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;