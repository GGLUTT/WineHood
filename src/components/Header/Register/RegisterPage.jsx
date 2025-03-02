// src/pages/RegisterPage/RegisterPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import BackButton from '../BackButton/BackButton';
import './RegisterPage.css';
import eyeIcon from '../../../img/ico/eyes.svg';
import eyeOffIcon from '../../../img/ico/eyes.svg';
import googleIcon from '../../../img/ico/google.svg';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Реєстраційні дані:', formData);
    // Тут буде логіка реєстрації
  };

  return (
    <div className="register-page">
      <Header />
      
      <div className="main-content">
        <div className="back-button-container">
          <BackButton text="Головна" to="/" />
        </div>
        
        <div className="auth-container">
          <div className="auth-form-container">
            <h1 className="auth-title">ЛАСКАВО ПРОСИМО ДО WINEHOOD!</h1>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Ім'я користувача</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Роман Мирний"
                  className="form-input"
                />
              </div>
              
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
                <p className="password-hint">Ваш пароль повинен містити 8 символів</p>
              </div>
              
              <div className="form-group">
                <label className="form-label">Підтвердіть пароль</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="********"
                    className="form-input"
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <img src={showConfirmPassword ? eyeIcon : eyeOffIcon} alt="Toggle password" />
                  </button>
                </div>
              </div>
              
              <button type="submit" className="submit-btn">ЗАРЕЄСТРУВАТИСЬ</button>
            </form>
            
            <div className="divider">
              <span>ОR</span>
            </div>
            
            <button className="google-auth-btn">
              <img src={googleIcon} alt="Google" className="google-icon" />
              ЗАРЕЄСТРУВАТИСЯ
            </button>
            
            <div className="auth-redirect">
              <span>Вже маєте акаунт?</span>
              <Link to="/login" className="auth-redirect-link">УВІЙТИ</Link>
            </div>
          </div>
          
          <div className="auth-image">
            {/* Зображення фону */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;