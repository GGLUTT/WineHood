// src/pages/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import BackButton from '../BackButton/BackButton';
import './LoginPage.css';
import eyeIcon from '../../../img/ico/eyes.svg';
import eyeOffIcon from '../../../img/ico/eyes.svg';
import googleIcon from '../../../img/ico/google.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    // Перевірка email
    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Будь ласка, введіть дійсну адресу електронної пошти";
    }

    // Перевірка паролю
    if (!formData.password) {
      newErrors.password = "Пароль є обов'язковим";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаємо помилку для поля, яке змінюється
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const loginUser = async (userData) => {
    try {
      setIsSubmitting(true);
      setLoginError('');
      
      // Використання fetch для запиту на сервер
      const response = await fetch('https://api.your-domain.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        // Обробка помилок від сервера
        if (response.status === 401) {
          throw new Error('Невірний email або пароль');
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Помилка входу. Спробуйте пізніше.');
        }
      }
      
      const data = await response.json();
      
      // Зберігаємо токен у localStorage
      localStorage.setItem('token', data.token);
      
      // Якщо є інформація про користувача, можна її також зберегти
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      // Перенаправлення на сторінку після успішного входу
      navigate('/dashboard');
      
      return data;
    } catch (error) {
      setLoginError(error.message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = () => {
    // Перенаправлення на сторінку аутентифікації Google
    window.location.href = 'https://api.your-domain.com/auth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валідація форми перед відправкою
    const isValid = validateForm();
    
    if (isValid) {
      try {
        // Дані для входу
        const userData = {
          email: formData.email,
          password: formData.password
        };
        
        // Імітуємо успішний вхід і переадресацію в режимі розробки
        if (process.env.NODE_ENV === 'development') {
          console.log('Дані для входу:', userData);
          setIsSubmitting(true);
          setTimeout(() => {
            setIsSubmitting(false);
            localStorage.setItem('token', 'fake-token-for-testing');
            navigate('/dashboard');
          }, 1000);
        } else {
          // В продакшн режимі використовуємо реальний API
          await loginUser(userData);
        }
      } catch (error) {
        console.error('Помилка входу:', error);
        // Помилка вже встановлена в функції loginUser
      }
    }
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
            
            {loginError && (
              <div className="error-message">
                {loginError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Адреса електронної пошти (email)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
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
                    className={`form-input ${errors.password ? 'input-error' : ''}`}
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <img src={showPassword ? eyeIcon : eyeOffIcon} alt="Toggle password" />
                  </button>
                </div>
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>
              
              <div className="forgot-password">
                <Link to="/forgot-password">Забули пароль?</Link>
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'ВХІД...' : 'УВІЙТИ'}
              </button>
            </form>
            
            <div className="divider">
              <span>ОR</span>
            </div>
            
            <button 
              className="google-auth-btn"
              onClick={handleGoogleAuth}
              disabled={isSubmitting}
            >
              <img src={googleIcon} alt="Google" className="google-icon" />
              УВІЙТИ ЧЕРЕЗ GOOGLE
            </button>
            
            <div className="auth-redirect">
              <span>Немає акаунту?</span>
              <Link to="/register" className="auth-redirect-link">ЗАРЕЄСТРУВАТИСЯ</Link>
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

export default LoginPage;