import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ExclusiveOffers.css';
import { useCart } from '../../Context/CartContext';
import penfolds1 from "../../../img/penfolds1.png";
import penfolds2 from "../../../img/penfolds2.png";
import penfolds3 from "../../../img/penfolds3.png";
import trapiche from "../../../img/card/new_botlle.png";
import rioja from "../../../img/card/new_botlle1.png";
import terrazas from "../../../img/card/new_botlle2.png";

const offers = [
  { id: 'exclusive-1', name: 'Penfolds Bin 60A', type: 'Червоне сухе вино', price: 19850, image: penfolds1 },
  { id: 'exclusive-2', name: 'Kracher Beerenauslese', type: 'Біле солодке вино', price: 4250, image: penfolds2 },
  { id: 'exclusive-3', name: 'Vega Sicilia Unico 2010', type: 'Червоне сухе вино', price: 24900, image: penfolds3 },
  { id: 'exclusive-4', name: 'Trapiche Malbec', type: 'Червоне сухе вино', price: 620, image: trapiche },
  { id: 'exclusive-5', name: 'Rioja Reserva', type: 'Червоне сухе вино', price: 890, image: rioja },
  { id: 'exclusive-6', name: 'Terrazas de los Andes', type: 'Червоне сухе вино', price: 1150, image: terrazas },
];

const formatPrice = (price) => `${price.toLocaleString('uk-UA')} ₴`;

const ExclusiveOffers = () => {
  const { addToCart } = useCart();
  const trackRef = useRef(null);
  const [liked, setLiked] = useState(() => new Set(['exclusive-2']));
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  const [added, setAdded] = useState(null);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const total = Math.max(1, Math.round(track.scrollWidth / track.clientWidth));
    const current = Math.round(track.scrollLeft / track.clientWidth);
    setPages(total);
    setPage(Math.min(current, total - 1));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };

    measure();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [measure]);

  const scrollToPage = (index) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  };

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAdd = (offer) => {
    addToCart({ ...offer, quantity: 1 });
    setAdded(offer.id);
    setTimeout(() => setAdded((current) => (current === offer.id ? null : current)), 1500);
  };

  return (
    <section className="exclusive-offers-section">
      <div className="wh-container">
        <div className="offers-header" data-reveal>
          <h2 className="wh-section-title">ЕКСКЛЮЗИВНІ ПРОПОЗИЦІЇ</h2>
          <div className="offers-header-actions">
            <div className="offers-arrows">
              <button className="wh-arrow" onClick={() => scrollToPage(page - 1)} disabled={page === 0} aria-label="Назад">
                <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button className="wh-arrow" onClick={() => scrollToPage(page + 1)} disabled={page >= pages - 1} aria-label="Далі">
                <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
            <Link to="/catalog" className="wh-btn wh-btn--outline-dark">ДЕТАЛЬНІШЕ</Link>
          </div>
        </div>

        <div className="offers-track" ref={trackRef}>
          {offers.map((offer) => {
            const isLiked = liked.has(offer.id);
            return (
              <article className="offer-card" key={offer.id}>
                <span className="offer-badge">Рідкісне вино</span>
                <button
                  className={`wishlist-button ${isLiked ? 'active' : ''}`}
                  onClick={() => toggleLike(offer.id)}
                  aria-label={isLiked ? 'Прибрати з обраного' : 'Додати в обране'}
                  aria-pressed={isLiked}
                >
                  <svg viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
                <div className="offer-image-wrap">
                  <img src={offer.image} alt={offer.name} className="offer-image" loading="lazy" />
                </div>
                <div className="offer-info">
                  <h3 className="offer-title">{offer.name}</h3>
                  <p className="offer-type">{offer.type}</p>
                  <div className="offer-price">{formatPrice(offer.price)}</div>
                </div>
                <div className="offer-buttons">
                  <button className="btn-cart" onClick={() => handleAdd(offer)}>
                    {added === offer.id ? 'ДОДАНО ✓' : 'ДО КОШИКА'}
                  </button>
                  <Link to="/catalog" className="btn-details">ДЕТАЛІ</Link>
                </div>
              </article>
            );
          })}
        </div>

        {pages > 1 && (
          <div className="wh-dots">
            {Array.from({ length: pages }, (_, index) => (
              <button
                key={index}
                className={`wh-dot ${index === page ? 'active' : ''}`}
                onClick={() => scrollToPage(index)}
                aria-label={`Сторінка ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExclusiveOffers;
