import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext.jsx';
import './CheckOut.css';

const deliveryOptions = [
  { id: 'pickup', title: 'Самовивіз', note: 'З магазину Wine Hood', cost: 0, price: 'Безкоштовно' },
  { id: 'courier', title: "Кур'єр Wine Hood", note: 'Доставка по місту', cost: 99, price: '99 ₴' },
  { id: 'nova-post-branch', title: 'Нова пошта', note: 'У відділення', cost: null, price: 'За тарифами перевізника' },
  { id: 'nova-post-courier', title: "Нова пошта, кур'єр", note: 'До дверей', cost: null, price: 'За тарифами перевізника' },
];

const paymentOptions = [
  { id: 'cash', title: 'Готівкою', note: 'При отриманні' },
  { id: 'card', title: 'Карткою онлайн', note: 'Visa / Mastercard' },
  { id: 'business', title: 'Безготівковий розрахунок', note: 'Для юридичних осіб' },
];

const formatPrice = (price) => `${Number(price).toLocaleString('uk-UA')} ₴`;

const Checkout = () => {
  const { cartItems, getTotalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [customerType, setCustomerType] = useState('new');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [comment, setComment] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '+380',
    email: '',
    city: '',
    address: '',
    branch: '',
    deliveryMethod: 'pickup',
    paymentMethod: 'cash',
  });

  // Підставляємо дані, якщо користувач уже авторизований
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (token && user) {
      setIsLoggedIn(true);
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '+380',
        email: user.email || '',
      }));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setOption = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const delivery = deliveryOptions.find((option) => option.id === formData.deliveryMethod);
  const subtotal = getTotalAmount();
  const total = subtotal + (delivery.cost || 0);
  const needsCity = formData.deliveryMethod !== 'pickup';
  const needsAddress = formData.deliveryMethod === 'courier' || formData.deliveryMethod === 'nova-post-courier';
  const needsBranch = formData.deliveryMethod === 'nova-post-branch';
  const showForm = isLoggedIn || customerType === 'new';

  const handleSubmit = (event) => {
    event.preventDefault();
    if (cartItems.length === 0) return;

    const orderData = {
      orderNumber: 'N' + Math.floor(10000 + Math.random() * 90000),
      customerInfo: formData,
      items: cartItems,
      totalAmount: total,
      comment,
      deliveryCost: delivery.cost === null ? 'За тарифами перевізника' : delivery.price,
      date: new Date().toLocaleDateString('uk-UA'),
    };

    if (isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...user, orders: [orderData, ...(user.orders || [])] }));
    }

    clearCart();
    navigate('/order-success', { state: { orderData } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="wh-container">
          <div className="co-empty">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6L5 3H2" />
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>
            <h1>Ваш кошик порожній</h1>
            <p>Додайте вино з каталогу, щоб оформити замовлення.</p>
            <Link to="/catalog" className="co-btn co-btn--primary">Перейти до каталогу</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="wh-container">
        <h1 className="co-title">Оформлення замовлення</h1>

        <form className="co-layout" onSubmit={handleSubmit}>
          <div className="co-main">
            {/* 1. Контакти */}
            <section className="co-card">
              <h2 className="co-card-title"><span>1</span>Контактна інформація</h2>

              {!isLoggedIn && (
                <div className="co-segmented" role="radiogroup" aria-label="Тип покупця">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={customerType === 'new'}
                    className={customerType === 'new' ? 'active' : ''}
                    onClick={() => setCustomerType('new')}
                  >
                    Я новий покупець
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={customerType === 'returning'}
                    className={customerType === 'returning' ? 'active' : ''}
                    onClick={() => setCustomerType('returning')}
                  >
                    Я постійний клієнт
                  </button>
                </div>
              )}

              {showForm ? (
                <div className="co-grid">
                  <label className="co-field">
                    <span>Ім'я</span>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Введіть ваше ім'я" autoComplete="given-name" required />
                  </label>
                  <label className="co-field">
                    <span>Прізвище</span>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Введіть ваше прізвище" autoComplete="family-name" required />
                  </label>
                  <label className="co-field">
                    <span>Номер телефону</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+380 XX XXX XX XX"
                      autoComplete="tel"
                      pattern="\+?[0-9\s\-()]{10,}"
                      title="Введіть номер у форматі +380XXXXXXXXX"
                      required
                    />
                  </label>
                  <label className="co-field">
                    <span>Електронна пошта</span>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" autoComplete="email" required />
                  </label>
                </div>
              ) : (
                <div className="co-login-hint">
                  <p>Увійдіть в акаунт — ми підставимо ваші дані та збережемо замовлення в історії.</p>
                  <div className="co-login-actions">
                    <Link to="/login" className="co-btn co-btn--primary">Увійти</Link>
                    <button type="button" className="co-btn co-btn--ghost" onClick={() => setCustomerType('new')}>
                      Продовжити як гість
                    </button>
                  </div>
                </div>
              )}
            </section>

            {showForm && (
              <>
                {/* 2. Доставка */}
                <section className="co-card">
                  <h2 className="co-card-title"><span>2</span>Спосіб доставки</h2>
                  <div className="co-options">
                    {deliveryOptions.map((option) => (
                      <label key={option.id} className={`co-option ${formData.deliveryMethod === option.id ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="deliveryMethod"
                          checked={formData.deliveryMethod === option.id}
                          onChange={() => setOption('deliveryMethod', option.id)}
                        />
                        <span className="co-radio" aria-hidden="true" />
                        <span className="co-option-text">
                          <strong>{option.title}</strong>
                          <small>{option.note}</small>
                        </span>
                        <span className="co-option-price">{option.price}</span>
                      </label>
                    ))}
                  </div>

                  {needsCity && (
                    <div className="co-grid co-grid--spaced">
                      <label className="co-field">
                        <span>Місто</span>
                        <input name="city" value={formData.city} onChange={handleChange} placeholder="Наприклад, Київ" autoComplete="address-level2" required />
                      </label>
                      {needsBranch && (
                        <label className="co-field">
                          <span>Номер відділення</span>
                          <input name="branch" value={formData.branch} onChange={handleChange} placeholder="№ відділення" inputMode="numeric" required />
                        </label>
                      )}
                      {needsAddress && (
                        <label className="co-field">
                          <span>Адреса</span>
                          <input name="address" value={formData.address} onChange={handleChange} placeholder="Вулиця, будинок, квартира" autoComplete="street-address" required />
                        </label>
                      )}
                    </div>
                  )}
                </section>

                {/* 3. Оплата */}
                <section className="co-card">
                  <h2 className="co-card-title"><span>3</span>Спосіб оплати</h2>
                  <div className="co-options co-options--three">
                    {paymentOptions.map((option) => (
                      <label key={option.id} className={`co-option ${formData.paymentMethod === option.id ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === option.id}
                          onChange={() => setOption('paymentMethod', option.id)}
                        />
                        <span className="co-radio" aria-hidden="true" />
                        <span className="co-option-text">
                          <strong>{option.title}</strong>
                          <small>{option.note}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                </section>

                {/* 4. Коментар */}
                <section className="co-card">
                  <h2 className="co-card-title"><span>4</span>Коментар до замовлення</h2>
                  <label className="co-field">
                    <span className="co-sr-only">Коментар</span>
                    <textarea
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      placeholder="Побажання щодо доставки, подарункове пакування тощо"
                      rows={4}
                    />
                  </label>
                </section>
              </>
            )}
          </div>

          {/* Підсумок */}
          <aside className="co-summary">
            <h2 className="co-summary-title">Ваше замовлення</h2>
            <ul className="co-items">
              {cartItems.map((item) => (
                <li key={item.id} className="co-item">
                  <div className="co-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="co-item-info">
                    <span className="co-item-name">{item.name}</span>
                    {item.type && <span className="co-item-type">{item.type}</span>}
                    <div className="co-qty">
                      <button
                        type="button"
                        onClick={() => (item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeFromCart(item.id))}
                        aria-label="Менше"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Більше">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="co-item-side">
                    <span className="co-item-price">{formatPrice(item.price * item.quantity)}</span>
                    <button type="button" className="co-item-remove" onClick={() => removeFromCart(item.id)}>
                      Видалити
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <dl className="co-totals">
              <div>
                <dt>Товари</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div>
                <dt>Доставка</dt>
                <dd>{delivery.cost === null ? 'За тарифами' : delivery.cost === 0 ? 'Безкоштовно' : formatPrice(delivery.cost)}</dd>
              </div>
              <div className="co-totals-grand">
                <dt>Всього</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>

            <button type="submit" className="co-btn co-btn--primary co-submit" disabled={!showForm}>
              Оформити замовлення
            </button>
            <p className="co-legal">
              Оформлюючи замовлення, ви підтверджуєте, що вам виповнилося 18 років.
            </p>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
