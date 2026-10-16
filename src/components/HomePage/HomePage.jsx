import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import avatar from "../../img/avatar.png";
import merlot from "../../img/merlot.webp";
import penfolds1 from "../../img/penfolds1.png";
import penfolds3 from "../../img/penfolds3.png";
import aboutVideo from "../../img/aboutus.mp4";
import aboutPoster from "../../img/aboutus_poster.jpg";
import BlogSection from './BlogSection/BlogSection';
import WineCategories from './BuyCategory/WineCategories';
import ExclusiveOffers from './ExclusiveOffers/ExclusiveOffers';
import Footer from '../Footer/Footer';
import useInViewVideo from './useInViewVideo';
import useReveal from './useReveal';

const collections = [
  { title: 'НОВИНКИ', cta: 'КУПУЙ ПЕРШИМ', to: '/catalog', modifier: 'new' },
  { title: 'ЛІДЕРИ ПРОДАЖІВ', cta: 'КУПУЙ УЛЮБЛЕНЕ', to: '/catalog', modifier: 'top' },
  { title: 'КРАЩЕ ДЛЯ ВЕЧІРКИ', cta: 'КУПУЙ ПЕРЕВІРЕНЕ', to: '/catalog', modifier: 'party' },
];

const aboutFacts = [
  { title: 'Ми про ексклюзив', text: '300+ рідкісних вин, яких не знайти у мас-маркеті' },
  { title: 'Ми про вибір', text: 'Ідеальний підбір вина за 30 секунд' },
  { title: 'Ми про швидкість', text: 'Доставка, швидка як відкриття пляшки' },
];

const testimonials = [
  {
    author: 'Леся Мирна',
    wine: 'CIMAROSA AUSTRALIEN MERLOT',
    image: merlot,
    text: 'Дуже люблю це вино, рекомендую кожному спробувати. Чудовий вибір для тихого вечора з близькою людиною.',
  },
  {
    author: 'Андрій Коваль',
    wine: 'PENFOLDS BIN 60A',
    image: penfolds1,
    text: 'Глибокий насичений смак і довгий післясмак. Брав на день народження друга — всі просили назву.',
  },
  {
    author: 'Олена Гринь',
    wine: 'VEGA SICILIA UNICO 2010',
    image: penfolds3,
    text: 'Швидка доставка, акуратне пакування, а саме вино перевершило очікування. Повернуся ще.',
  },
];

const HomePage = () => {
  const pageRef = useRef(null);
  const aboutVideoRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeReview, setActiveReview] = useState(0);

  useReveal(pageRef);
  useInViewVideo(aboutVideoRef);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 600);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const review = testimonials[activeReview];
  const showReview = (index) => {
    setActiveReview((index + testimonials.length) % testimonials.length);
  };

  return (
    <div className="home-page" ref={pageRef}>
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content wh-container">
          <h1 className="brand-name">
            <span className="wine-text">WINE</span>
            <span className="hero-subtitle">НОВИЙ ПОГЛЯД НА ВИНО</span>
            <span className="hood-text">HOOD</span>
          </h1>
          <p className="hero-description">
            Винний простір для сучасної міської аудиторії. Ми створюємо місце,
            де вино стає доступним, зрозумілим і натхненним.
          </p>
          <Link to="/catalog" className="cta-button">ЗНАЙТИ СВОЄ ВИНО</Link>
        </div>
        <button
          className="hero-scroll"
          aria-label="Гортати вниз"
          onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span />
        </button>
      </section>

      <WineCategories />

      {/* Про нас */}
      <section className="about-section">
        <div className="wh-container">
          <div className="about-head" data-reveal>
            <div>
              <h2 className="wh-section-title wh-section-title--light">Про нас</h2>
              <p className="about-text">
                Ми не просто продаємо вино — ми створюємо атмосферу, руйнуємо стереотипи та даємо свободу вибору.
                У нас немає нудних описів – лише емоції, стиль та справжній смак.
              </p>
            </div>
            <Link to="/about" className="wh-btn wh-btn--outline-light">Детальніше</Link>
          </div>

          <div className="about-video-wrapper" data-reveal>
            <video
              ref={aboutVideoRef}
              className="about-video"
              src={aboutVideo}
              poster={aboutPoster}
              preload="none"
              loop
              muted
              playsInline
            />
            <div className="video-overlay">
              <h3 className="video-title">WINEHOOD</h3>
              <p className="video-subtitle">Відкриваємо вино по-новому</p>
            </div>
          </div>

          <div className="info-grid">
            {aboutFacts.map((fact, index) => (
              <div className="info-card" key={fact.title} data-reveal style={{ '--reveal-delay': `${index * 80}ms` }}>
                <span className="info-card-index">0{index + 1}</span>
                <h3>{fact.title}</h3>
                <p>{fact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Добірки */}
      <section className="catalog-section">
        <div className="wh-container">
          <div className="catalog-grid">
            {collections.map((item, index) => (
              <Link
                to={item.to}
                key={item.title}
                className={`catalog-card catalog-card--${item.modifier}`}
                data-reveal
                style={{ '--reveal-delay': `${index * 80}ms` }}
              >
                <div className="catalog-content-home-page">
                  <h2 className="catalog-title">{item.title}</h2>
                  <span className="catalog-btn">{item.cta}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BlogSection />
      <ExclusiveOffers />

      {/* Відгуки */}
      <section className="testimonials-section">
        <div className="wh-container">
          <div className="testimonials-head" data-reveal>
            <h2 className="wh-section-title">ЛЮДИ ГОВОРЯТЬ</h2>
            <div className="testimonials-nav">
              <button className="wh-arrow" onClick={() => showReview(activeReview - 1)} aria-label="Попередній відгук">
                <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button className="wh-arrow" onClick={() => showReview(activeReview + 1)} aria-label="Наступний відгук">
                <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>

          <div className="testimonial-slide" key={activeReview}>
            <div className="testimonial-content">
              <h3 className="wine-title">{review.wine}</h3>
              <div className="testimonial-rating" aria-label="5 з 5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="star">★</span>
                ))}
              </div>
              <p className="testimonial-text">«{review.text}»</p>
              <div className="testimonial-author-info">
                <img src={avatar} alt="" className="author-avatar" />
                <span className="testimonial-author">{review.author}</span>
              </div>
            </div>
            <div className="testimonial-wine">
              <img src={review.image} alt={review.wine} className="bottle-image" loading="lazy" />
            </div>
          </div>

          <div className="wh-dots">
            {testimonials.map((item, index) => (
              <button
                key={item.author}
                className={`wh-dot ${index === activeReview ? 'active' : ''}`}
                onClick={() => showReview(index)}
                aria-label={`Відгук ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <button
        className={`back-to-top ${isScrolled ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Нагору"
      >
        <svg viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
        </svg>
      </button>
    </div>
  );
};

export default HomePage;
