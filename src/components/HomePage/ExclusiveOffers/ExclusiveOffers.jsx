import React, { useState } from 'react';
import './ExclusiveOffers.css';
import penfolds1 from "../../../img/penfolds1.png";
import penfolds2 from "../../../img/penfolds2.png";
import penfolds3 from "../../../img/penfolds3.png";

const ExclusiveOffers = () => {
  const [likedItems, setLikedItems] = useState([false, true, false]);

  const toggleLike = (index) => {
    const newLikedItems = [...likedItems];
    newLikedItems[index] = !newLikedItems[index];
    setLikedItems(newLikedItems);
  };

  return (
    <section className="exclusive-offers-section">
      <div className="container">
        <div className="offers-header">
          <h2 className="section-title">ЕКСКЛЮЗИВНІ ПРОПОЗИЦІЇ</h2>
          <a href="#" className="details-link">ДЕТАЛЬНІШЕ</a>
        </div>
        <div className="offers-grid">
          {/* First card with hover buttons outside */}
          <div className="card-wrapper">
            <div className="offer-card">
              <div className="wine-category">Рідкісне вино</div>
              <button 
                className={`wishlist-button ${likedItems[0] ? 'active' : ''}`}
                onClick={() => toggleLike(0)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={likedItems[0] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              <img src={penfolds1} alt="Penfolds Bin 60A" className="offer-image" />
              <div className="offer-details">
                <div className="offer-info">
                  <h3 className="offer-title">Penfolds Bin 60A</h3>
                  <p className="offer-type">Червоне сухе вино</p>
                  <div className="offer-price">19 850₴</div>
                </div>
              </div>
            </div>
            <div className="offer-buttons">
              <a href="#" className="btn-cart">ДО КОШИКА</a>
              <a href="#" className="btn-details">ДЕТАЛІ</a>
            </div>
          </div>
          
          {/* Second card with hover buttons outside */}
          <div className="card-wrapper">
            <div className="offer-card">
              <div className="wine-category">Рідкісне вино</div>
              <button 
                className={`wishlist-button ${likedItems[1] ? 'active' : ''}`}
                onClick={() => toggleLike(1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={likedItems[1] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              <img src={penfolds2} alt="Penfolds Bin 60A" className="offer-image" />
              <div className="offer-details">
                <div className="offer-info">
                  <h3 className="offer-title">Penfolds Bin 60A</h3>
                  <p className="offer-type">Біле солодке вино</p>
                  <div className="offer-price">19 850₴</div>
                </div>
              </div>
            </div>
            <div className="offer-buttons">
              <a href="#" className="btn-cart">ДО КОШИКА</a>
              <a href="#" className="btn-details">ДЕТАЛІ</a>
            </div>
          </div>
          
          {/* Third card with hover buttons outside */}
          <div className="card-wrapper">
            <div className="offer-card">
              <div className="wine-category">Рідкісне вино</div>
              <button 
                className={`wishlist-button ${likedItems[2] ? 'active' : ''}`}
                onClick={() => toggleLike(2)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={likedItems[2] ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              <img src={penfolds3} alt="Penfolds Bin 60A" className="offer-image" />
              <div className="offer-details">
                <div className="offer-info">
                  <h3 className="offer-title">Penfolds Bin 60A</h3>
                  <p className="offer-type">Червоне сухе вино</p>
                  <div className="offer-price">19 850₴</div>
                </div>
              </div>
            </div>
            <div className="offer-buttons">
              <a href="#" className="btn-cart">ДО КОШИКА</a>
              <a href="#" className="btn-details">ДЕТАЛІ</a>
            </div>
          </div>
        </div>
        
        <div className="pagination">
          <span className="pagination-dot active"></span>
          <span className="pagination-dot"></span>
          <span className="pagination-dot"></span>
          <span className="pagination-dot"></span>
        </div>
        
        <div className="slider-controls">
          <button className="slider-prev">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="slider-next">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOffers;