import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import searchIcon from '../../img/ico/search.svg';
import cartIcon from '../../img/ico/korzina.svg';
import userIcon from '../../img/ico/user.svg';
import logo from "../../img/Logo.svg";
import ShoppingCart from '../Cart/ShoppingCart';
import ProfileMenu from '../ProfileMenu/ProfileMenu.jsx'; // Оновіть шлях відповідно до вашої структури проекту
import { useCart } from '../Context/CartContext';

const Header = () => {
  const { isCartOpen, toggleCart, getTotalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [cartBump, setCartBump] = useState(false);
  const [prevCartItems, setPrevCartItems] = useState(0);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  // Handle cart animation when items change
  useEffect(() => {
    const currentItems = getTotalItems();
    if (prevCartItems !== currentItems && prevCartItems < currentItems) {
      setCartBump(true);
      setTimeout(() => setCartBump(false), 300);
    }
    setPrevCartItems(currentItems);
  }, [getTotalItems, prevCartItems]);

  // Кнопка профілю для передачі в ProfileMenu
  const profileButton = (
    <button 
      className="icon-button" 
      aria-label="Профіль" 
      onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
    >
      <img src={userIcon} alt="Профіль" />
    </button>
  );

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <nav className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/catalog">Каталог</Link>
            </li>
            <li className="nav-item">
              <Link to="/promotions">Акції</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog">Блог</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">Про нас</Link>
            </li>
          </ul>
        </nav>
        
        <Link to="/" className="logo-link">
          <img className="logo-img" src={logo} alt="Logo" />
        </Link>
        
        <div className="header-controls">
          <button className="icon-button" aria-label="Пошук">
            <img src={searchIcon} alt="Пошук" />
          </button>
          <button 
            className={`icon-button cart-button ${cartBump ? 'bump' : ''}`}
            onClick={toggleCart}
            aria-label="Кошик"
            style={cartBump ? { animation: 'bump 0.3s ease' } : {}}
          >
            <img src={cartIcon} alt="Кошик" />
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </button>
          
          {/* Використовуємо оновлений ProfileMenu із власною кнопкою */}
          <ProfileMenu 
            isOpen={isProfileMenuOpen} 
            setIsOpen={setIsProfileMenuOpen} 
            customButton={profileButton} 
          />
        </div>
      </div>
      
      {isCartOpen && (
        <div className="shopping-cart-wrapper" style={{ animation: 'slideIn 0.3s ease' }}>
          <ShoppingCart />
        </div>
      )}
    </header>
  );
};

export default Header;