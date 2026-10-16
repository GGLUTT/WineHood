import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchWines } from '../../../data/wines';
import './SearchPanel.css';

const suggestions = ['Penfolds', 'Червоне', 'Рожеве', 'Франція', 'Сухе'];
const MAX_RESULTS = 6;

const formatPrice = (price) => `${price.toLocaleString('uk-UA')} ₴`;

const SearchPanel = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');

  const results = useMemo(() => searchWines(query), [query]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  const goTo = (path) => {
    onClose();
    navigate(path);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const q = query.trim();
    if (!q) return;
    goTo(`/catalog?q=${encodeURIComponent(q)}`);
  };

  const trimmed = query.trim();

  return (
    <>
      <div className={`search-backdrop ${isOpen ? 'visible' : ''}`} onClick={onClose} aria-hidden="true" />
      <div className={`search-panel ${isOpen ? 'open' : ''}`} role="dialog" aria-label="Пошук" aria-hidden={!isOpen}>
        <div className="search-panel-inner">
          <form className="search-form" onSubmit={handleSubmit} role="search">
            <svg className="search-form-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Знайти вино, виробника чи країну"
              className="search-input"
              aria-label="Пошуковий запит"
              tabIndex={isOpen ? 0 : -1}
            />
            {query && (
              <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Очистити">
                ✕
              </button>
            )}
            <button type="submit" className="search-submit" tabIndex={isOpen ? 0 : -1}>
              Знайти
            </button>
          </form>

          {!trimmed && (
            <div className="search-suggestions">
              <span className="search-label">Часто шукають</span>
              <div className="search-chips">
                {suggestions.map((item) => (
                  <button key={item} type="button" className="search-chip" onClick={() => setQuery(item)} tabIndex={isOpen ? 0 : -1}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {trimmed && results.length === 0 && (
            <p className="search-empty">
              За запитом «{trimmed}» нічого не знайдено. Спробуйте іншу назву або країну.
            </p>
          )}

          {results.length > 0 && (
            <>
              <span className="search-label">
                Знайдено: {results.length}
              </span>
              <ul className="search-results">
                {results.slice(0, MAX_RESULTS).map((wine) => (
                  <li key={wine.id}>
                    <button type="button" className="search-result" onClick={() => goTo(`/product/${wine.id}`)}>
                      <span className="search-result-image">
                        <img src={wine.image} alt="" loading="lazy" />
                      </span>
                      <span className="search-result-info">
                        <span className="search-result-name">{wine.name}</span>
                        <span className="search-result-meta">{wine.type} · {wine.country}</span>
                      </span>
                      <span className="search-result-price">{formatPrice(wine.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" className="search-all" onClick={handleSubmit}>
                Показати всі результати в каталозі →
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPanel;
