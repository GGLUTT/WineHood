import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from "../../img/Logo.svg";
import exslusive from "../../img/wine.png";
import avatar from "../../img/avatar.png";
import merlot from "../../img/merlot.png";

// import WineText from "../../img/WineText.png"; 
// import HoodText from "../../img/HoodText.png";
import aboutVideo from "../../img/aboutus.mp4"; 
import Background from "../../img/bcg_HomePage.png";
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import BlogSection from './BlogSection/BlogSection';
import WineCategories from './BuyCategory/WineCategories';
import ExclusiveOffers from './ExclusiveOffers/ExclusiveOffers';
// import AgeVerificationModal from '../AgeVefification/AgeVerificationPage';
// import AgeVerificationModal from '../AgeVefification/AgeVerificationModal';


const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };



  
  return (
    <div className="home-page">
      {/* Header/Navigation */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <nav className="main-nav">
            <ul className="nav-links">
              <li><Link to="/catalog" className="nav-link">Каталог</Link></li>
              <li><Link to="/akcii" className="nav-link">Акції</Link></li>
              <li><Link to="/blog" className="nav-link">Блог</Link></li>
              <li><Link to="/about" className="nav-link">Про нас</Link></li>
            </ul>
          </nav>
          
          <div className="logo">
          <Link to="/">
              <img className="logo-img" src={logo} alt="Logo" />
          </Link>
          </div>
          
          <div className="header-icons">
            <button className="icon-button search">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34 6.5 6.5 0 1 0-2.47 7.33l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0a4.5 4.5 0 1 1 3.18-7.68A4.5 4.5 0 0 1 9.5 14z" />
              </svg>
            </button>
            <Link to="/cart" className="icon-button cart">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 3c0 .55.45 1 1 1h1l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A.996.996 0 0 0 21 4H5.21l-.67-1.43a.993.993 0 0 0-.9-.57H2c-.55 0-1 .45-1 1zm16 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </Link>
            <ProfileMenu />
          </div>
        </div>
      </header>

      {/* Hero Section */}
<section class="hero-section">
  <div class="hero-content">
    <div class="brand-name">
      <div class="wine-text">WINE</div>
      <div class="hood-text">HOOD</div>
      <div class="hero-subtitle">НОВИЙ ПОГЛЯД НА ВИНО</div>
    </div>
    <div class="hero-description">
      Винний простір для сучасної міської аудиторії.
      Ми створюємо місце, де вино стає доступним,
      зрозумілим і натхненним.
    </div>
    <div class="cta-container">
      <a href="#" class="cta-button">ЗНАЙТИ СВОЄ ВИНО</a>
    </div>
  </div>
</section>

      {/* Page Indicators/Pagination */}
      <div className="page-indicators">
        {[0, 1, 2].map((index) => (
          <span 
            key={index}
            className={`indicator ${activeSlide === index ? 'active' : ''}`} 
            onClick={() => handleSlideChange(index)}
          ></span>
        ))}
      </div>

     <WineCategories />





      {/* Категорії секція */}
      <section className="about-section">
      <div className="container">
        <div className="about-content">
          <h2 className="section-title_aboutUs" data-aos="fade-up">Про нас</h2>
          <p className="about-text" data-aos="fade-up" data-aos-delay="100">
            Ми не просто продаємо вино — ми створюємо атмосферу, руйнуємо стереотипи та даємо свободу вибору.
            У нас немає нудних описів – лише емоції, стиль та справжній смак.
          </p>
          <Link to="/about" className="about-button" data-aos="fade-up" data-aos-delay="200">
            Детальніше
          </Link>
        </div>

        <div className="about-video-wrapper" data-aos="fade-up" data-aos-delay="300">
          <video className="about-video" autoPlay loop muted playsInline>
            <source src={aboutVideo} type="video/mp4" />
            Ваш браузер не підтримує відео.
          </video>
          <div className="video-overlay">
            <h3 className="video-title">WINEHOOD</h3>
            <p className="video-subtitle">Відкриваємо вино по-новому</p>
          </div>
        </div>

        <div className="info-grid" data-aos="fade-up">
          <div className="info-card">
            <h3>Ми про ексклюзив</h3>
            <p>300+ рідкісних вин, яких не знайти у мас-маркеті</p>
          </div>
          <div className="info-card">
            <h3>Ми про вибір</h3>
            <p>Ідеальний підбір вина за 30 секунд</p>
          </div>
          <div className="info-card">
            <h3>Ми про швидкість</h3>
            <p>Доставка, швидка як відкриття пляшки</p>
          </div>
        </div>
      </div>
    </section>

       {/* Блог секція */}
<section className="catalog-section">
  <div className="container">
    <div className="catalog-grid">
      <div className="catalog-card">
        <div className="catalog-content">
          <h2 className="catalog-title">НОВИНКИ</h2>
          <a href="/new" className="catalog-btn">КУПУЙ ПЕРШИМ</a>
        </div>
      </div>
      
      <div className="catalog-card">
        <div className="catalog-content">
          <h2 className="catalog-title">ЛІДЕРИ ПРОДАЖІВ</h2>
          <a href="/bestsellers" className="catalog-btn">КУПУЙ УЛЮБЛЕНЕ</a>
        </div>
      </div>
      
      <div className="catalog-card">
        <div className="catalog-content">
          <h2 className="catalog-title">КРАЩЕ ДЛЯ ВЕЧІРКИ</h2>
          <a href="/party" className="catalog-btn">КУПУЙ ПЕРЕВІРЕНЕ</a>
        </div>
      </div>
    </div>
  </div>
</section>



     {/* Блог */}
     <BlogSection />
     <ExclusiveOffers />

  

      {/* Відгуки про вина */}
      <section className="testimonials-section" data-aos="fade-up">
      <div className="container">
        <h2 className="section-title_people">ЛЮДИ ГОВОРЯТЬ</h2>
        <h3 className="wine-title">CIMAROSA AUSTRALIEN MERLOT</h3>
        <div className="testimonials-slider">
          <div className="testimonial-slide">
            <div className="testimonial-content" data-aos="fade-right">
              <div className="testimonial-author-info">
                <img src={avatar} alt="Леся Мирна" className="author-avatar" />
                <h3 className="testimonial-author">Леся Мирна</h3>
              </div>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="star pulse">★</span>
                ))}
              </div>
              <p className="testimonial-text">"Дуже люблю це вино, рекомендую кожному спробувати. 
              Чудовий вибір для тихого вечора з близькою людиною."</p>
            </div>
            <div className="testimonial-wine" data-aos="fade-left">
              <img src={merlot} alt="CIMAROSA AUSTRALIEN MERLOT" className="bottle-image" />
            </div>
          </div>
        </div>
        
        
        <div className="pagination">
          <span className="pagination-dot active"></span>
          <span className="pagination-dot"></span>
          <span className="pagination-dot"></span>
          <span className="pagination-dot"></span>
        </div>
      </div>
      
      <div className="navigation">
        <button className="nav-button prev">&#10094;</button>
        <button className="nav-button next">&#10095;</button>
      </div>
      
      <div className="divider"></div>
    </section>
      {/* Кнопка "вгору" */}
      <button 
        className={`back-to-top ${isScrolled ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg viewBox="0 0 24 24">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
      </button>
    </div>
  );
};

export default HomePage;