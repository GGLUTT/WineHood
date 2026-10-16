import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const columns = [
  {
    title: 'Навігація',
    links: [
      { to: '/catalog', label: 'Каталог' },
      { to: '/promotions', label: 'Акції' },
      { to: '/blog', label: 'Блог' },
      { to: '/about', label: 'Про нас' },
    ],
  },
  {
    title: 'Отримати допомогу',
    links: [
      { to: '/help', label: 'Довідковий центр' },
      { to: '/returns', label: 'Політика повернення' },
      { to: '/delivery', label: 'Інформація про доставку' },
    ],
  },
  {
    title: 'Профіль',
    links: [
      { to: '/login', label: 'Увійти' },
      { to: '/register', label: 'Зареєструватися' },
    ],
  },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="wh-container">
        <div className="footer-top">
          <Link to="/" className="footer-brand">W.H</Link>

          <form className="footer-form" onSubmit={handleSubmit}>
            <h3 className="footer-form-title">
              Приєднайся до закритого клубу підписників, щоб отримати{' '}
              <span className="footer-accent">10% знижки</span> на покупку
            </h3>
            {subscribed ? (
              <p className="footer-form-success">Дякуємо! Промокод уже летить на вашу пошту.</p>
            ) : (
              <div className="footer-input-group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Електронна адреса"
                  className="footer-email-input"
                  aria-label="Електронна адреса"
                />
                <button type="submit" className="footer-submit" aria-label="Підписатися">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="footer-content">
          {columns.map((column) => (
            <div className="footer-column" key={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">Політика конфіденційності</Link>
            <Link to="/terms" className="footer-link">Умови обслуговування</Link>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Wine Hood. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
