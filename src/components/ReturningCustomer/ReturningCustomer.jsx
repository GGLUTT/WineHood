import React, { useState } from 'react';
import './ReturningCustomer.css';

const ReturningCustomer = ({ onLogin, onCancel }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Here you would typically verify the user credentials with your backend
      setTimeout(() => {
        // Simulating API call
        if (loginData.email && loginData.password) {
          // Successful login - return user data
          onLogin({
            firstName: 'Повернутий',
            lastName: 'Клієнт',
            phone: '+380123456789',
            email: loginData.email,
          });
        } else {
          setError('Невірний email або пароль');
        }
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setError('Помилка при вході. Спробуйте ще раз.');
      setIsLoading(false);
    }
  };

  return (
    <div className="returning-customer-container">
      <h3>Вхід для постійних клієнтів</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleInputChange}
            placeholder="Введіть вашу електронну пошту"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            placeholder="Введіть ваш пароль"
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="buttons-container">
          <button 
            type="submit" 
            className="login-button" 
            disabled={isLoading}
          >
            {isLoading ? 'Зачекайте...' : 'УВІЙТИ'}
          </button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={onCancel}
          >
            НАЗАД
          </button>
        </div>
        
        <div className="forgot-password">
          <a href="#forgot-password">Забули пароль?</a>
        </div>
      </form>
    </div>
  );
};

export default ReturningCustomer;