// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import BackButton from '../BackButton/BackButton';
import './LoginPage.css';
import eyeIcon from '../../../img/ico/eyes.svg';
import eyeOffIcon from '../../../img/ico/eyes.svg';
import googleIcon from '../../../img/ico/google.svg';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Дані для входу:', formData);
    // Тут буде логіка входу
  };

  return (
    <div className="login-page">
      <Header />
      
      <div className="main-content">
        <div className="back-button-container">
          <BackButton text="Головна" to="/" />
        </div>
        
        <div className="auth-container">
          <div className="auth-form-container">
            <h1 className="auth-title">З ПОВЕРНЕННЯМ!</h1>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Адреса електронної пошти (email)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Input text"
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Пароль</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className="form-input"
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img src={showPassword ? eyeIcon : eyeOffIcon} alt="Toggle password" />
                  </button>
                </div>
              </div>
              
              <div className="forgot-password">
                <Link to="/forgot-password">Забули пароль?</Link>
              </div>
              
              <button type="submit" className="submit-btn">УВІЙТИ</button>
            </form>
            
            <div className="divider">
              <span>ОR</span>
            </div>
            
            <button className="google-auth-btn">
              <img src={googleIcon} alt="Google" className="google-icon" />
              BUTTON TEXT
            </button>
            
            <div className="auth-redirect">
              <span>Вже маєте акаунт?</span>
              <Link to="/register" className="auth-redirect-link">УВІЙТИ</Link>
            </div>
          </div>
          
          <div className="auth-image">
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;