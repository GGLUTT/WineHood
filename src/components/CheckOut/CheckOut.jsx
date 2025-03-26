import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx';
import './CheckOut.css';
import Header from '../Header/Header.jsx';

const Checkout = () => {
  const { cartItems, getTotalAmount } = useCart();
  const navigate = useNavigate();
  
  const [customerType, setCustomerType] = useState('new');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '+380',
    email: '',
    password: '',
    deliveryMethod: 'pickup',
    paymentMethod: 'cash'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [comment, setComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Перевіряємо, чи користувач вже авторизований
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (token && user) {
      setIsLoggedIn(true);
      setFormData(prevData => ({
        ...prevData,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '+380',
        email: user.email || ''
      }));
    }
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleRadioChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Тут буде логіка авторизації
    console.log('Login attempt with:', formData.email, formData.password);
  };

  const handleGoogleLogin = () => {
    // Тут буде логіка входу через Google
    console.log('Google login attempt');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Створюємо об'єкт з даними замовлення
    const orderData = {
      orderNumber: 'N' + Math.floor(10000 + Math.random() * 90000),
      customerInfo: formData,
      items: cartItems,
      totalAmount: getTotalAmount(),
      comment: comment,
      deliveryCost: formData.deliveryMethod === 'courier' ? '99₴' : 'За тарифами перевізника',
      date: new Date().toLocaleDateString('uk-UA')
    };
    
    // Якщо користувач авторизований, зберігаємо замовлення в його акаунті
    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const orders = user.orders || [];
      orders.unshift(orderData);
      localStorage.setItem('user', JSON.stringify({
        ...user,
        orders
      }));
    }
    
    console.log('Замовлення відправлено:', orderData);
    navigate('/order-success', { state: { orderData } });
  };
  
  const renderLoginForm = () => (
    <div className="login-form">
      <div className="form-group">
        <label>Адреса електронної пошти (email)</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Введіть вашу електронну пошту"
          required
        />
      </div>
      
      <div className="form-group password-group">
        <label>Пароль</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Введіть ваш пароль"
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁" : "👁"}
          </button>
        </div>
        <a href="/forgot-password" className="forgot-password">
          Забули пароль?
        </a>
      </div>
      
      <button type="button" className="login-button" onClick={handleLogin}>
        УВІЙТИ
      </button>
      
      <div className="dividers">
        <span>або</span>
      </div>
      
      <button type="button" className="google-login" onClick={handleGoogleLogin}>
        <img src="/google-icon.svg" alt="Google" />
        УВІЙТИ ЧЕРЕЗ GOOGLE
      </button>
    </div>
  );
  
  return (
    <div className="checkout-container">
      <Header />

      <h1 className="checkout-title">ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h1>
      
      <form onSubmit={handleSubmit}>
        <section className="contact-info">
          <h2>Контактна інформація</h2>
          
          {!isLoggedIn && (
            <div className="customer-type">
              <label className={`customer-option ${customerType === 'new' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="customerType" 
                  checked={customerType === 'new'} 
                  onChange={() => setCustomerType('new')} 
                />
                <span className="radio-custom"></span>
                Я новий покупець
              </label>
              
              <label className={`customer-option ${customerType === 'returning' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="customerType" 
                  checked={customerType === 'returning'} 
                  onChange={() => setCustomerType('returning')} 
                />
                <span className="radio-custom"></span>
                Я постійний клієнт
              </label>
            </div>
          )}
          
          {customerType === 'returning' && !isLoggedIn ? (
            renderLoginForm()
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Ім'я</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleInputChange} 
                    placeholder="Введіть ваше ім'я" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Прізвище</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleInputChange} 
                    placeholder="Введіть ваше прізвище" 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Номер телефону</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    placeholder="+380" 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <label>Адреса електронної пошти (email)</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="Введіть вашу електронну пошту" 
                    required 
                  />
                </div>
              </div>
            </>
          )}
        </section>
        
        {(customerType === 'new' || isLoggedIn) && (
          <>
            <section className="delivery-method">
              <h2>Спосіб доставки</h2>
              
              <div className="delivery-options">
                <label className="delivery-option">
                  <input 
                    type="radio" 
                    name="deliveryMethod" 
                    checked={formData.deliveryMethod === 'pickup'} 
                    onChange={() => handleRadioChange('deliveryMethod', 'pickup')} 
                  />
                  <span className="radio-custom"></span>
                  <span className="option-text">Самовивіз</span>
                  <span className="option-price">Безкоштовно</span>
                </label>
                
                <label className="delivery-option">
                  <input 
                    type="radio" 
                    name="deliveryMethod" 
                    checked={formData.deliveryMethod === 'courier'} 
                    onChange={() => handleRadioChange('deliveryMethod', 'courier')} 
                  />
                  <span className="radio-custom"></span>
                  <span className="option-text">Кур'єрська доставка</span>
                  <span className="option-price">99₴</span>
                </label>
                
                <label className="delivery-option">
                  <input 
                    type="radio" 
                    name="deliveryMethod" 
                    checked={formData.deliveryMethod === 'nova-post-branch'} 
                    onChange={() => handleRadioChange('deliveryMethod', 'nova-post-branch')} 
                  />
                  <span className="radio-custom"></span>
                  <span className="option-text">Нова пошта (відділення)</span>
                  <span className="option-price">Згідно тарифів перевізника</span>
                </label>
                
                <label className="delivery-option">
                  <input 
                    type="radio" 
                    name="deliveryMethod" 
                    checked={formData.deliveryMethod === 'nova-post-courier'} 
                    onChange={() => handleRadioChange('deliveryMethod', 'nova-post-courier')} 
                  />
                  <span className="radio-custom"></span>
                  <span className="option-text">Нова пошта (кур'єрська доставка)</span>
                  <span className="option-price">Згідно тарифів перевізника</span>
                </label>
              </div>
            </section>
            
            <section className="payment-method">
              <h2>Спосіб оплати</h2>
              
              <div className="payment-options">
                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    checked={formData.paymentMethod === 'cash'} 
                    onChange={() => handleRadioChange('paymentMethod', 'cash')} 
                  />
                  <span className="radio-custom"></span>
                  <span className="option-text">Готівкою</span>
                </label>
                
                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    checked={formData.paymentMethod === 'card'} 
                    onChange={() => handleRadioChange('paymentMethod', 'card')} 
                  />
                  <span className="radio-custom"></span>
                  <span className="option-text">Карткою онлайн</span>
                </label>
                
                <label className="payment-option">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    checked={formData.paymentMethod === 'business'} 
                    onChange={() => handleRadioChange('paymentMethod', 'business')} 
                  />
                  <span className="radio-custom"></span>
                  <span className="option-text">Безготівкова для юридичних осіб</span>
                </label>
              </div>
            </section>
            
            <section className="comment-section">
              <h2>Коментар</h2>
              <div className="comment-container">
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Додайте коментар до замовлення"
                ></textarea>
                <button type="button" className="send-comment-button">ВІДПРАВИТИ</button>
              </div>
            </section>
            
            <section className="order-summary">
              <div className="order-items">
                <h3>Ваше замовлення</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>Червоне сухе вино</p>
                      <p>{item.quantity} шт.</p>
                    </div>
                    <div className="item-price">{item.price} ₴</div>
                  </div>
                ))}
              </div>
              
              <div className="order-total">
                <div className="total-label">Всього:</div>
                <div className="total-amount">{getTotalAmount()} ₴</div>
              </div>
              
              <button type="submit" className="submit-order">ОФОРМИТИ ЗАМОВЛЕННЯ</button>
            </section>
          </>
        )}
      </form>
    </div>
  );
};

export default Checkout;