import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import searchIcon from '../../img/ico/search.svg';
import cartIcon from '../../img/ico/korzina.svg';
import userIcon from '../../img/ico/user.svg';
import logo from "../../img/Logo.svg";
import ShoppingCart from '../Cart/ShoppingCart';
import { useCart } from '../Context/CartContext';

const Header = () => {
  const { isCartOpen, toggleCart, getTotalItems } = useCart();

  return (
    <header className="header">
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
        
        <Link to="/">
          <img className="logo-img" src={logo} alt="Logo" />
        </Link>
        
        <div className="header-controls">
          <button className="icon-button">
            <img src={searchIcon} alt="Пошук" />
          </button>
          <button className="icon-button cart-button" onClick={toggleCart}>
            <img src={cartIcon} alt="Кошик" />
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </button>
          <button className="icon-button">
            <img src={userIcon} alt="Профіль" />
          </button>
        </div>
      </div>
      
      {isCartOpen && <ShoppingCart />}
    </header>
  );
};

export default Header;