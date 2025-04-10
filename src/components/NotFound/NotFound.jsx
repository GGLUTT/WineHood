import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';
import spiltWine from "../../img/error404.png"; 

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">Здається, ми щось пролили...</h1>
        <div className="wine-spill">
          <img src={spiltWine} alt="Розлите вино" className="spilt-wine-img" />
        </div>
        <p className="not-found-message">
          Ох, це ваша сторінка! На жаль, її тут немає, але ми можемо запропонувати щось не менш смачне.
        </p>
        <div className="not-found-actions">
          <Link to="/catalog" className="home-button">
            Каталог вин
          </Link>
          <Link to="/" className="catalog-button">
            Головна
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;