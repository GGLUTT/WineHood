// src/pages/RegisterPage/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import BackButton from '../BackButton/BackButton';
import './RegisterPage.css';
import eyeIcon from '../../../img/ico/eyes.svg';
import eyeOffIcon from '../../../img/ico/eyes.svg';
import googleIcon from '../../../img/ico/google.svg';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerError, setRegisterError] = useState('');

  const validateForm = () => {
    const newErrors = {};

    // Перевірка імені
    if (!formData.name.trim()) {
      newErrors.name = "Ім'я користувача є обов'язковим";
    } else if (formData.name.length < 2) {
      newErrors.name = "Ім'я має містити не менше 2 символів";
    }

    // Перевірка email
    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Будь ласка, введіть дійсну адресу електронної пошти";
    }

    // Перевірка паролю
    if (!formData.password) {
      newErrors.password = "Пароль є обов'язковим";
    } else if (formData.password.length < 8) {
      newErrors.password = "Пароль має містити не менше 8 символів";
    }

    // Перевірка підтвердження паролю
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Паролі не співпадають";
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

  const registerUser = async (userData) => {
    try {
      setIsSubmitting(true);
      setRegisterError('');
      
      // Використання fetch замість axios
      const response = await fetch('https://api.your-domain.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        // Обробка помилок від сервера
        if (response.status === 409) {
          throw new Error('Користувач з такою електронною поштою вже існує');
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Помилка реєстрації. Спробуйте пізніше.');
        }
      }
      
      const data = await response.json();
      
      // Зберігаємо токен у localStorage
      localStorage.setItem('token', data.token);
      
      // Перенаправлення на сторінку після успішної реєстрації
      navigate('/dashboard');
      
      return data;
    } catch (error) {
      setRegisterError(error.message);
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
        // Підготовка даних для відправки (без confirmPassword)
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password
        };
        
        // Імітуємо успішну реєстрацію і переадресацію (для тестування)
        // Під час інтеграції з реальним API закоментуйте ці рядки і розкоментуйте виклик registerUser
        if (process.env.NODE_ENV === 'development') {
          console.log('Дані для реєстрації:', userData);
          setIsSubmitting(true);
          setTimeout(() => {
            setIsSubmitting(false);
            localStorage.setItem('token', 'fake-token-for-testing');
            navigate('/dashboard');
          }, 1000);
        } else {
          // В продакшн режимі використовуємо реальний API
          await registerUser(userData);
        }
      } catch (error) {
        console.error('Помилка реєстрації:', error);
        // Помилка вже встановлена в функції registerUser
      }
    }
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
            
            {registerError && (
              <div className="error-message">
                {registerError}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Ім'я користувача</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Роман Мирний"
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>
              
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
                {errors.password ? (
                  <p className="error-text">{errors.password}</p>
                ) : (
                  <p className="password-hint">Ваш пароль повинен містити 8 символів</p>
                )}
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
                    className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                  />
                  <button 
                    type="button" 
                    className="password-toggle-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <img src={showConfirmPassword ? eyeIcon : eyeOffIcon} alt="Toggle password" />
                  </button>
                </div>
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>
              
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'РЕЄСТРАЦІЯ...' : 'ЗАРЕЄСТРУВАТИСЬ'}
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