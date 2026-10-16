import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import aboutVideo from '../../img/aboutus.mp4';
import './AboutPage.css';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="container">
        <div className="about-header">
          <h1>Про нас</h1>
          <div className="accent-line"></div>
        </div>

        <div className="about-content-wrapper">
          <div className="about-text-content">
            <p className="main-desc">
              Ми не просто продаємо вино — ми створюємо атмосферу, руйнуємо стереотипи та даємо свободу вибору.
              У нас немає нудних описів – лише емоції, стиль та справжній смак.
            </p>
            <p className="sub-desc">
              Винний простір для сучасної міської аудиторії. Ми створюємо місце, де вино стає доступним, зрозумілим і натхненним. Кожна пляшка у нашій колекції проходить ретельний відбір нашими сомельє, щоб ви могли насолоджуватися лише найкращими смаками.
            </p>
          </div>

          <div className="about-media-wrapper">
            <video className="about-video-player" autoPlay loop muted playsInline>
              <source src={aboutVideo} type="video/mp4" />
              Ваш браузер не підтримує відео.
            </video>
            <div className="video-card-overlay">
              <h3>WINEHOOD</h3>
              <p>Відкриваємо вино по-новому</p>
            </div>
          </div>
        </div>

        <div className="info-cards-grid">
          <div className="info-card-item">
            <h3>Ми про ексклюзив</h3>
            <p>300+ рідкісних вин, яких не знайти у мас-маркеті</p>
          </div>
          <div className="info-card-item">
            <h3>Ми про вибір</h3>
            <p>Ідеальний підбір вина за 30 секунд</p>
          </div>
          <div className="info-card-item">
            <h3>Ми про швидкість</h3>
            <p>Доставка, швидка як відкриття пляшки</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
