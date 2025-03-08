import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import spiltWine from "../../img/error404.png"; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <div className="wine-spill">
          <img src={spiltWine} alt="Розлите вино" className="spilt-wine-img" />
        </div>
        <h1 className="not-found-title">Упс! Помилка</h1>
        {/* <p className="not-found-message">
          Схоже, сторінка, яку ви шукаєте, зникла або ніколи не існувала.
        </p> */}
        <div className="not-found-actions">
          <Link to="/" className="home-button">
            На головну сторінку
          </Link>
          <Link to="/catalog" className="catalog-button">
            Перейти до каталогу
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;