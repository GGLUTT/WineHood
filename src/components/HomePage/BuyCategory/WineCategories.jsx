import React from 'react';
import { Link } from 'react-router-dom';
import './WineCategories.css';

import redWineImage from '../../../img/red_wine.webp';
import whiteWineImage from '../../../img/white_wine.webp';
import pinkWineImage from '../../../img/pink_wine.webp';
import sparklingWineImage from '../../../img/igristoe_wine.webp';

const categories = [
  { title: 'ЧЕРВОНЕ ВИНО', image: redWineImage, alt: 'Червоне вино', modifier: 'red' },
  { title: 'БІЛЕ ВИНО', image: whiteWineImage, alt: 'Біле вино', modifier: 'white' },
  { title: 'РОЖЕВЕ ВИНО', image: pinkWineImage, alt: 'Рожеве вино', modifier: 'rose' },
  { title: 'ІГРИСТЕ ВИНО', image: sparklingWineImage, alt: 'Ігристе вино', modifier: 'sparkling' },
];

const WineCategories = () => (
  <section className="wine-categories" id="categories">
    <div className="wh-container">
      <h2 className="wh-section-title wine-categories-title" data-reveal>КУПУЙТЕ ЗА КАТЕГОРІЯМИ</h2>
      <div className="wine-categories-grid">
        {categories.map((category, index) => (
          <Link
            to="/catalog"
            key={category.modifier}
            className={`wine-category-item wine-category-item--${category.modifier}`}
            data-reveal
            style={{ '--reveal-delay': `${index * 70}ms` }}
          >
            <img
              src={category.image}
              alt={category.alt}
              className="wine-category-image"
              loading="lazy"
              decoding="async"
            />
            <span className="wine-category-label">{category.title}</span>
            <span className="wine-category-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default WineCategories;
