import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import searchIcon from '../../img/ico/search.svg';
import cartIcon from '../../img/ico/korzina.svg';
import userIcon from '../../img/ico/user.svg';
import logo from "../../img/Logo.svg";
import ShoppingCart from '../Cart/ShoppingCart';
import ProfileMenu from '../ProfileMenu/ProfileMenu.jsx';
import { useCart } from '../Context/CartContext';

const navItems = [
  { to: '/catalog', label: 'Каталог' },
  { to: '/promotions', label: 'Акції' },
  { to: '/blog', label: 'Блог' },
  { to: '/about', label: 'Про нас' },
];

const Header = () => {
  const { isCartOpen, toggleCart, getTotalItems } = useCart();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = getTotalItems();
  const prevItemsRef = useRef(totalItems);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (totalItems > prevItemsRef.current) {
      setCartBump(true);
      const timer = setTimeout(() => setCartBump(false), 300);
      prevItemsRef.current = totalItems;
      return () => clearTimeout(timer);
    }
    prevItemsRef.current = totalItems;
    return undefined;
  }, [totalItems]);

  // Закриваємо мобільне меню при переході на іншу сторінку
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const profileButton = (
    <button
      className="icon-button"
      aria-label="Профіль"
      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
    >
      <img src={userIcon} alt="" />
    </button>
  );

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        <button
          className={`burger-button ${isMenuOpen ? 'active' : ''}`}
          aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="nav-menu" aria-label="Головна навігація">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/" className="logo-link" aria-label="Wine Hood — на головну">
          <img className="logo-img" src={logo} alt="Wine Hood" />
        </Link>

        <div className="header-controls">
          <button className="icon-button search-button" aria-label="Пошук">
            <img src={searchIcon} alt="" />
          </button>
          <button
            className={`icon-button cart-button ${cartBump ? 'bump' : ''}`}
            onClick={toggleCart}
            aria-label="Кошик"
          >
            <img src={cartIcon} alt="" />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>

          <ProfileMenu
            isOpen={isProfileMenuOpen}
            setIsOpen={setIsProfileMenuOpen}
            customButton={profileButton}
          />
        </div>
      </div>

      <div
        className={`mobile-menu-backdrop ${isMenuOpen ? 'visible' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      <nav className={`mobile-menu ${isMenuOpen ? 'open' : ''}`} aria-label="Мобільна навігація" aria-hidden={!isMenuOpen}>
        <ul>
          {navItems.map((item, index) => (
            <li key={item.to} style={{ '--i': index }}>
              <NavLink to={item.to} tabIndex={isMenuOpen ? 0 : -1}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-footer">
          <Link to="/login" tabIndex={isMenuOpen ? 0 : -1}>Увійти</Link>
          <Link to="/register" tabIndex={isMenuOpen ? 0 : -1}>Зареєструватися</Link>
        </div>
      </nav>

      {isCartOpen && (
        <div className="shopping-cart-wrapper">
          <ShoppingCart />
        </div>
      )}
    </header>
  );
};

export default Header;
