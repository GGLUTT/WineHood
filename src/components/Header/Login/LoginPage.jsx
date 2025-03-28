// src/pages/LoginPage/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../Header';
import BackButton from '../BackButton/BackButton';
import './LoginPage.css';
import eyeIcon from '../../../img/ico/eyes.svg';
import eyeOffIcon from '../../../img/ico/eye-off.svg';
import googleIcon from '../../../img/ico/google.svg';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Перевіряємо, чи користувач вже авторизований
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      // Якщо користувач вже авторизований, перенаправляємо на дашборд
      // або на сторінку, з якої він був перенаправлений на логін
      const destination = location.state?.from || '/account';
      navigate(destination, { replace: true });
    }
  }, [navigate, location]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Будь ласка, введіть дійсну адресу електронної пошти";
    }

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
      
      // В режимі розробки імітуємо успішний вхід
      if (process.env.NODE_ENV === 'development') {
        // Імітуємо затримку мережевого запиту
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Створюємо тестового користувача
        const mockUser = {
          id: '12345',
          email: userData.email,
          firstName: 'None',
          lastName: 'None',
          phone: '+380 66 745 22 35'
        };
        
        localStorage.setItem('token', 'fake-token-for-testing');
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        return mockUser;
      }

      // В продакшн режимі використовуємо реальний API
      const response = await fetch('https://api.your-domain.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Невірний email або пароль');
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || 'Помилка входу. Спробуйте пізніше.');
        }
      }
      
      const data = await response.json();
      
      // Зберігаємо токен та дані користувача
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      setLoginError(error.message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = () => {
    // Зберігаємо інформацію про redirectUrl для OAuth провайдера
    const redirectUrl = location.state?.from || '/account';
    localStorage.setItem('authRedirectUrl', redirectUrl);
    
    // Перенаправлення на сторінку аутентифікації Google
    window.location.href = `https://api.your-domain.com/auth/google?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = validateForm();
    
    if (isValid) {
      try {
        await loginUser({
          email: formData.email,
          password: formData.password
        });
        
        // Перенаправлення після успішного входу
        const destination = location.state?.from || '/account';
        navigate(destination, { replace: true });
      } catch (error) {
        console.error('Помилка входу:', error);
      }
    }
  };

  // Функція для виходу з аккаунту, можна використовувати у компоненті кабінету
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="login-page">
      {/* <Header /> */}
      
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
                    <img 
                      src={showPassword ? eyeIcon : eyeOffIcon} 
                      alt={showPassword ? "Hide password" : "Show password"} 
                    />
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