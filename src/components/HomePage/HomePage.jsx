import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';
import logo from "../../img/Logo.svg";
import exslusive from "../../img/wine.png";
import avatar from "../../img/avatar.png";
import merlot from "../../img/merlot.png";
// import WineText from "../../img/WineText.png"; 
// import HoodText from "../../img/HoodText.png";
import aboutVideo from "../../img/aboutus.mp4"; 
import Background from "../../img/bcg_HomePage.png";
// import AgeVerificationModal from '../AgeVefification/AgeVerificationModal';


const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  
  // Перевірка віку при завантаженні сторінки
  useEffect(() => {
    const ageVerified = localStorage.getItem('ageVerified') === 'true';
    
    if (!ageVerified) {
      // Зберігаємо поточний шлях, щоб повернутися після верифікації
      localStorage.setItem('redirectAfterVerification', window.location.pathname);
      // Перенаправляємо на сторінку верифікації
      navigate('/age-verification');
    }
  }, [navigate]);

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
            <Link to="/account" className="icon-button account">
              <svg className="icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${Background})` }}>
      <div className="hero-content">
        <div className="hero-title animate-fade-in">
          <span className="wine-text">WINE</span>
          <span className="hood-text">HOOD</span>
         
          <span className="hero-subtitle">НОВИЙ ПОГЛЯД НА ВИНО</span>
          {/* <img className="hood-text" src={HoodText} alt="HOOD" /> */}
        </div>

        <div className="hero-description animate-fade-in delay-400">
          <p>Винний простір для сучасної міської аудиторії.</p>
          <p>Ми створюємо місце, де вино стає доступним, зрозумілим і натхненним.</p>
        </div>

        <div className="cta-container animate-fade-in delay-600">
          <Link to="/catalog" className="cta-button">ЗНАЙТИ СВОЄ ВИНО</Link>
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


{/* Ексклюзивні пропозиції */}
<section className="exclusive-offers-section">
  <div className="container">
    <div className="offers-header">
      <h2 className="section-title">ЕКСКЛЮЗИВНІ ПРОПОЗИЦІЇ</h2>
      <a href="/offers" className="details-link">ДЕТАЛЬНІШЕ</a>
    </div>
    
    <div className="offers-grid">
      <div className="offer-card">
        <div className="offer-image">
          <img src={exslusive} alt="Gewurztraminer Leon Beyer" />
        </div>
        <div className="offer-info">
          <h3 className="offer-title">Gewurztraminer Leon Beyer 0.75л</h3>
          <p className="offer-price">1 350 ₴</p>
          <button className="add-to-cart-btn">
            <svg viewBox="0 0 24 24" className="cart-icon">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm3-11H7.07l-.85-2H2v2h3.45l4.13 9h7.88l3.55-7H8.1l-.9-2H20zm-1 3.5l-1.96 3.5H9.5L7.97 10.5H19z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="offer-card">
        <div className="offer-image">
          <img src={exslusive} alt="Gewurztraminer Leon Beyer" />
        </div>
        <div className="offer-info">
          <h3 className="offer-title">Gewurztraminer Leon Beyer 0.75л</h3>
          <p className="offer-price">1 350 ₴</p>
          <button className="add-to-cart-btn">
            <svg viewBox="0 0 24 24" className="cart-icon">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm3-11H7.07l-.85-2H2v2h3.45l4.13 9h7.88l3.55-7H8.1l-.9-2H20zm-1 3.5l-1.96 3.5H9.5L7.97 10.5H19z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="offer-card">
        <div className="offer-image">
          <img src={exslusive} alt="Gewurztraminer Leon Beyer" />
        </div>
        <div className="offer-info">
          <h3 className="offer-title">Gewurztraminer Leon Beyer 0.75л</h3>
          <p className="offer-price">1 350 ₴</p>
          <button className="add-to-cart-btn">
            <svg viewBox="0 0 24 24" className="cart-icon">
              <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM17 18c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm3-11H7.07l-.85-2H2v2h3.45l4.13 9h7.88l3.55-7H8.1l-.9-2H20zm-1 3.5l-1.96 3.5H9.5L7.97 10.5H19z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

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

   

      {/* Підписка на розсилку
      <section className="newsletter-section" data-aos="fade-up">
        <div className="container">
          <h2 className="section-title">ПІДПИСАТИСЯ НА НОВИНИ</h2>
          <p className="newsletter-description">Будьте в курсі новинок, знижок та ексклюзивних пропозицій</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Ваш email" required className="glow-input" />
            <button type="submit" className="submit-btn">
              <span>Підписатися</span>
              <svg className="envelope-icon" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
              </svg>
            </button>
          </form>
        </div>
      </section> */}

     {/* Футер */}
     <footer className="footer">
  <div className="container">
    <div className="footer-logo">
      <a href="/" className="logo">W.H</a>
    </div>
    
    <div className="footer-content">
      <div className="footer-column">
        <h3>Навігація</h3>
        <ul>
          <li><a href="/catalog" className="footer-link">Каталог</a></li>
          <li><a href="/akcii" className="footer-link">Акції</a></li>
          <li><a href="/blog" className="footer-link">Блог</a></li>
          <li><a href="/pro-nas" className="footer-link">Про нас</a></li>
        </ul>
      </div>
      
      <div className="footer-column">
        <h3>Отримати допомогу</h3>
        <ul>
          <li><a href="/dovidkoviy-centr" className="footer-link">Довідковий центр</a></li>
          <li><a href="/polityka-povernennya" className="footer-link">Політика повернення</a></li>
          <li><a href="/dostavka" className="footer-link">Інформація про доставку</a></li>
        </ul>
      </div>
      
      <div className="footer-column">
        <h3>Профіль</h3>
        <ul>
          <li><a href="/uviyty" className="footer-link">Увійти</a></li>
          <li><a href="/reestraciya" className="footer-link">Зареєструватися</a></li>
        </ul>
      </div>
      
      <div className="footer-form">
        <div className="input-group">
          <input type="email" placeholder="Електронна адреса" className="email-input" />
          <button type="submit" className="submit-btn_footer">
            <svg viewBox="0 0 24 24" className="arrow-icon">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div className="footer-bottom">
      <div className="footer-links">
        <a href="/polityka-konfidenciynosti" className="footer-link">Політика конфіденційності</a>
        <a href="/umovy-obslugovuvannya" className="footer-link">Умови обслуговування</a>
      </div>
      <p className="copyright">© 2025 All Rights Reserved</p>
    </div>
  </div>
</footer>
      
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