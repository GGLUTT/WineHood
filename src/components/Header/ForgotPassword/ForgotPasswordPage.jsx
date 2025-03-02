// src/pages/ForgotPasswordPage/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import Header from '../Header';
import BackButton from '../BackButton/BackButton';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Запит на відновлення паролю:', email);
    // Тут буде логіка відправки листа для відновлення паролю якщо буде)))
  };

  return (
    <div className="forgot-password-page">
      <Header />
      
      <div className="main-content">
        <div className="back-button-container">
          <BackButton text="Головна" to="/" />
        </div>
        
        <div className="auth-container">
          <div className="auth-form-container">
            <h1 className="auth-title">ЗАБУЛИ ПАРОЛЬ?</h1>
            
            <p className="auth-description">
              Введіть адресу електронної пошти, яку ви використовували 
              під час приєднання, і ми надішлемо вам інструкції щодо зміни 
              пароля.
            </p>
            
            <p className="security-note">
              З міркувань безпеки ми НЕ зберігаємо ваш пароль.
            </p>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Адреса електронної пошти (email)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Input text"
                  className="form-input"
                />
              </div>
              
              <button type="submit" className="submit-btn">УВІЙТИ</button>
            </form>
          </div>
          
          <div className="auth-image forgot-password-image">
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;