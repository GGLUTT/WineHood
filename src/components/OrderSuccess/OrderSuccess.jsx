import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderData } = location.state || {};
  const orderNumber = orderData?.orderNumber || 'N12345';
  
  return (
    <div className="order-success-container">
      <Header />
      
      <div className="success-content">
        <div className="success-left-content">
          <h1 className="success-title">ДЯКУЄМО ЗА ЗАМОВЛЕННЯ!</h1>
          <p className="order-number">Ваше замовлення №{orderNumber} прийнято і незабаром буде надіслано.</p>
          
          <div className="order-details-section">
            <div className="details-block">
              <h3>Особиста інформація</h3>
              <p>{orderData?.customerInfo?.firstName} {orderData?.customerInfo?.lastName}</p>
              <p>{orderData?.customerInfo?.email}</p>
            </div>
            
            <div className="details-block">
              <h3>Спосіб доставки</h3>
              {orderData?.customerInfo?.deliveryMethod === 'nova-post-branch' && (
                <>
                  <p>Нова пошта (відділення)</p>
                  <p className="address">
                    Дніпро, Дніпропетровська обл.,<br />
                    Відділення №1 вул. Маршала Малиновського, 114
                  </p>
                </>
              )}
              {orderData?.customerInfo?.deliveryMethod === 'nova-post-courier' && (
                <p>Нова пошта (кур'єрська доставка)</p>
              )}
              {orderData?.customerInfo?.deliveryMethod === 'courier' && (
                <p>Кур'єрська доставка</p>
              )}
              {orderData?.customerInfo?.deliveryMethod === 'pickup' && (
                <p>Самовивіз</p>
              )}
            </div>
            
            <div className="details-block">
              <h3>Спосіб оплати</h3>
              {orderData?.customerInfo?.paymentMethod === 'cash' && (
                <p>Готівкою</p>
              )}
              {orderData?.customerInfo?.paymentMethod === 'card' && (
                <p>Карткою онлайн</p>
              )}
              {orderData?.customerInfo?.paymentMethod === 'business' && (
                <p>Безготівкова для юридичних осіб</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="success-right-content">
          <h3>Ваше замовлення</h3>
          <div className="order-items-list">
            {orderData?.items?.map(item => (
              <div key={item.id} className="success-order-item">
                <div className="success-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="success-item-details">
                  <h4>{item.name}</h4>
                  <p>{item.description || 'Червоне сухе вино'}</p>
                  <div className="price-quantity">
                    <span className="price-label">Ціна:</span>
                    <span className="price-value">{item.price} ₴</span>
                    <span className="quantity-label">Кількість:</span>
                    <span className="quantity-value">{item.quantity || 1}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="success-order-total">
            <div className="delivery-cost">
              <span>Вартість доставки:</span>
              <span>{orderData?.deliveryCost || 'За тарифами перевізника'}</span>
            </div>
            <div className="final-total">
              <span>До сплати:</span>
              <span className="total-price">{orderData?.totalAmount || '480'} ₴</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="success-buttons">
        <Link to="/shop" className="continue-shopping-btn">ПРОДОВЖИТИ ПОКУПКИ</Link>
        <Link to="/" className="home-page-btn">НА ГОЛОВНУ</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;