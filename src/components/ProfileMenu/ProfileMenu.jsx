import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfileMenu.css';
import flag from "../../img/ico/flag.svg";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Закриття меню при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="profile-menu-container" ref={menuRef}>
      <button className="icon-button account" onClick={toggleMenu}>
        <svg className="icon" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="quick-links-menu">
          <div className="menu-header">
            <h2>Швидкі посилання</h2>
            <button className="close-button" onClick={toggleMenu}>
              <svg viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
          
          <div className="menu-links">
            <Link to="/account" className="menu-link">Особистий кабінет</Link>
            <Link to="/returns" className="menu-link">Повернення</Link>
            <Link to="/help" className="menu-link">Допомога</Link>
            <Link to="/text" className="menu-link">Текст</Link>
          </div>
          
          <div className="language-selector">
            <span>Українська</span>
            <img src={flag} alt="Прапор України" className="flag-icon" />
          </div>
          
          <div className="menu-footer">
            <Link to="/login" className="login-button">ВХІД</Link>
            <div className="register-prompt">
              <span>Ще не маєте акаунта?</span>
              <Link to="/register" className="register-link">ЗАРЕЄСТРУВАТИСЬ</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;