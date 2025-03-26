import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-logo">
          <a href="/" className="logo">W.H</a>
        </div>
        
        <div className="footer-content">
          <div className="footer-column">
            <h3>Навігація</h3>
            <ul>
              <li><a href="/catalog" className="footer-link">Каталог</a></li>
              <li><a href="/akcii" className="footer-link">Акції</a></li>
              <li><a href="/blog" className="footer-link">Блог</a></li>
              <li><a href="/pro-nas" className="footer-link">Про нас</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Отримати допомогу</h3>
            <ul>
              <li><a href="/dovidkoviy-centr" className="footer-link">Довідковий центр</a></li>
              <li><a href="/polityka-povernennya" className="footer-link">Політика повернення</a></li>
              <li><a href="/dostavka" className="footer-link">Інформація про доставку</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Профіль</h3>
            <ul>
              <li><a href="/login" className="footer-link">Увійти</a></li>
              <li><a href="/register" className="footer-link">Зареєструватися</a></li>
            </ul>
          </div>
          
          <div className="footer-form">
            <h1 className="new_header">Приєднайся до закритого клубу підписників, щоб отримати <p className='p_sale_footer'>10% знижки</p> на покупку</h1>
            <div className="input-group">
              <input type="email" placeholder="Електронна адреса" className="email-input" />
              <button type="submit" className="submit-btns_footer">
                <svg viewBox="0 0 24 24" className="arrow-icon">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-links">
            <a href="/polityka-konfidenciynosti" className="footer-link">Політика конфіденційності</a>
            <a href="/umovy-obslugovuvannya" className="footer-link">Умови обслуговування</a>
          </div>
          <p className="copyright">© 2025 All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;