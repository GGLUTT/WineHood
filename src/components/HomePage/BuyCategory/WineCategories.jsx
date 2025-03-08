import React from 'react';
import './WineCategories.css';

// Import images
import redWineImage from '../../../img/red_wine.png';
import whiteWineImage from '../../../img/white_wine.png';
import pinkWineImage from '../../../img/pink_wine.png';
import sparklingWineImage from '../../../img/igristoe_wine.png';

const WineCategories = () => {
  const categories = [
    {
      title: 'ЧЕРВОНЕ ВИНО',
      image: redWineImage,
      alt: 'Red Wine',
      customClass: 'red-wine-category',
      width: 690
    },
    {
      title: 'БІЛЕ ВИНО',
      image: whiteWineImage,
      alt: 'White Wine',
      customClass: 'white-wine-category',
      width: 486
    },
    {
      title: 'РОЖЕВЕ ВИНО',
      image: pinkWineImage,
      alt: 'Rose Wine',
      customClass: 'rose-wine-category',
      width: 486
    },
    {
      title: 'ІГРИСТЕ ВИНО',
      image: sparklingWineImage,
      alt: 'Sparkling Wine',
      customClass: 'sparkling-wine-category',
      width: 690,
      left: 200
    }
  ];

  return (
    <div className="wine-categories-container">
      <div className="wine-categories-title-container">
        <h2 className="wine-categories-title">КУПУЙТЕ ЗА КАТЕГОРІЯМИ</h2>
      </div>
      <div className="wine-categories-grid">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`wine-category-item ${category.customClass}`}
            style={{ 
              width: `${category.width}px`,
              ...(category.left !== undefined && { left: `-${category.left}px` })
            }}
          >
            <img
              src={category.image}
              alt={category.alt}
              className="wine-category-image"
            />
            <div className="wine-category-overlay">
              <span className="wine-category-label">{category.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WineCategories;