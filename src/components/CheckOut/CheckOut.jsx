import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx';
import ReturningCustomer from '../ReturningCustomer/ReturningCustomer.jsx'; 
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
    deliveryMethod: 'pickup', // самовивіз за замовчуванням
    paymentMethod: 'cash' // готівка за замовчуванням
  });
  const [comment, setComment] = useState('');
  
  // Обробка змін вводу
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
  
  const handleLoginSuccess = (userData) => {
    setFormData({
      ...formData,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      email: userData.email
    });
    setCustomerType('new');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Тут би відправили замовлення на бекенд
    console.log('Замовлення відправлено:', { customerInfo: formData, items: cartItems, total: getTotalAmount(), comment });
    // Перенаправлення на сторінку успіху або показ підтвердження
    alert('Замовлення успішно оформлено!');
    // navigate('/order-confirmation');
  };
  
  return (
    
    <div className="checkout-container">
      <Header></Header>

      <h1 className="checkout-title">ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h1>
      
      <form onSubmit={handleSubmit}>

        {/* Розділ інформації про клієнта */}
        <section className="contact-info">
          
          <h2>Контактна інформація</h2>
          
          <div className="customer-type">
            <label className={`customer-option ${customerType === 'new' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="customerType" 
                checked={customerType === 'new'} 
                onChange={() => setCustomerType('new')} 
              />
              Я новий покупець
            </label>
            
            <label className={`customer-option ${customerType === 'returning' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="customerType" 
                checked={customerType === 'returning'} 
                onChange={() => setCustomerType('returning')} 
              />
              Я постійний клієнт
            </label>
          </div>
          
          {customerType === 'returning' ? (
            <ReturningCustomer 
              onLogin={handleLoginSuccess} 
              onCancel={() => setCustomerType('new')} 
            />
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
        
        {/* Показувати решту форми лише коли не в режимі входу постійного клієнта */}
        {customerType !== 'returning' && (
          <>
            {/* Розділ способу доставки */}
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
            
            {/* Розділ способу оплати */}
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
            
            {/* Розділ коментаря */}
            <section className="comment-section">
              <h2>Коментар</h2>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Додайте коментар до замовлення"
              ></textarea>
            </section>
            
            {/* Підсумок замовлення */}
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
                      <p>1 шт.</p>
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
            
            <div className="navigation-buttons">
              <button type="button" className="back-button" onClick={() => navigate(-1)}>НАЗАД</button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Checkout;