import React from 'react';
import { Link } from 'react-router-dom';
import './AgeRestrictionPage.css';

const AgeRestrictionPage = () => {
  return (
    <div className="age-restriction-page">
      <div className="restriction-container">
        <h1>Доступ обмежено</h1>
        <p>
          На жаль, цей сайт містить інформацію про алкогольні напої і доступний 
          тільки для користувачів віком від 18 років.
        </p>
        <p>
          Будь ласка, поверніться, коли вам виповниться 18 років.
        </p>
        <div className="actions">
          <Link to="/" className="home-link">Повернутися на головну</Link>
        </div>
      </div>
    </div>
  );
};

export default AgeRestrictionPage;