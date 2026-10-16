import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Footer from '../Footer/Footer.jsx';
import './OrderSuccess.css';

import wineGlassesImage from '../../img/Accept.webp';

const deliveryLabels = {
  pickup: 'Самовивіз з магазину Wine Hood',
  courier: "Кур'єр Wine Hood",
  'nova-post-branch': 'Нова пошта, відділення',
  'nova-post-courier': "Нова пошта, кур'єр",
};

const paymentLabels = {
  cash: 'Готівкою при отриманні',
  card: 'Карткою онлайн',
  business: 'Безготівковий розрахунок для юридичних осіб',
};

const formatPrice = (price) => `${Number(price).toLocaleString('uk-UA')} ₴`;

const OrderSuccess = () => {
  const location = useLocation();
  const { orderData } = location.state || {};

  if (!orderData) {
    return (
      <div className="order-success-page">
        <div className="wh-container">
          <div className="os-card os-missing">
            <h1>Замовлення не знайдено</h1>
            <p>Схоже, ви відкрили цю сторінку напряму. Оформіть замовлення в каталозі — і тут з'явиться підтвердження.</p>
            <Link to="/catalog" className="os-btn os-btn--primary">Перейти до каталогу</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const { customerInfo = {}, items = [] } = orderData;
  const subtotal = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const deliveryDetails = [
    customerInfo.city,
    customerInfo.deliveryMethod === 'nova-post-branch' && customerInfo.branch && `відділення №${customerInfo.branch}`,
    (customerInfo.deliveryMethod === 'courier' || customerInfo.deliveryMethod === 'nova-post-courier') && customerInfo.address,
  ].filter(Boolean).join(', ');

  return (
    <div className="order-success-page">
      <div className="wh-container">
        <section className="os-hero">
          <div className="os-hero-text">
            <span className="os-check" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
            </span>
            <h1 className="os-title">Дякуємо за замовлення!</h1>
            <p className="os-subtitle">
              Замовлення <strong>№{orderData.orderNumber}</strong> від {orderData.date} прийнято.
              Ми зв'яжемося з вами найближчим часом, щоб підтвердити деталі.
            </p>
            <div className="os-actions">
              <Link to="/catalog" className="os-btn os-btn--primary">Продовжити покупки</Link>
              <Link to="/" className="os-btn os-btn--ghost">На головну</Link>
            </div>
          </div>
          <img src={wineGlassesImage} alt="" className="os-hero-image" />
        </section>

        <div className="os-layout">
          <section className="os-card">
            <h2 className="os-card-title">Деталі замовлення</h2>
            <dl className="os-details">
              <div>
                <dt>Отримувач</dt>
                <dd>
                  {customerInfo.firstName} {customerInfo.lastName}
                  {customerInfo.phone && <span>{customerInfo.phone}</span>}
                  {customerInfo.email && <span>{customerInfo.email}</span>}
                </dd>
              </div>
              <div>
                <dt>Доставка</dt>
                <dd>
                  {deliveryLabels[customerInfo.deliveryMethod] || '—'}
                  {deliveryDetails && <span>{deliveryDetails}</span>}
                </dd>
              </div>
              <div>
                <dt>Оплата</dt>
                <dd>{paymentLabels[customerInfo.paymentMethod] || '—'}</dd>
              </div>
              {orderData.comment && (
                <div>
                  <dt>Коментар</dt>
                  <dd>{orderData.comment}</dd>
                </div>
              )}
            </dl>
          </section>

          <section className="os-card">
            <h2 className="os-card-title">Ваше замовлення</h2>
            <ul className="os-items">
              {items.map((item) => (
                <li key={item.id} className="os-item">
                  <div className="os-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="os-item-info">
                    <span className="os-item-name">{item.name}</span>
                    {item.type && <span className="os-item-meta">{item.type}</span>}
                    <span className="os-item-meta">
                      {item.quantity || 1} × {formatPrice(item.price)}
                    </span>
                  </div>
                  <span className="os-item-price">{formatPrice(item.price * (item.quantity || 1))}</span>
                </li>
              ))}
            </ul>

            <dl className="os-totals">
              <div>
                <dt>Товари</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div>
                <dt>Доставка</dt>
                <dd>{orderData.deliveryCost}</dd>
              </div>
              <div className="os-totals-grand">
                <dt>До сплати</dt>
                <dd>{formatPrice(orderData.totalAmount)}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
