import React, { useState } from "react";
import "./CitySelectionModal.css";

const CitySelectionModal = ({ isOpen, onClose, onSelectCity }) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const cities = [
    "Дніпро", "Запоріжжя", "Івано-Франківськ", "Київ", "Кривий Ріг", 
    "Кропивницький", "Львів", "Миколаїв", "Одеса", "Полтава", 
    "Рівне", "Суми", "Тернопіль", "Ужгород", "Харків", 
    "Херсон", "Хмельницький", "Черкаси", "Чернівці", "Чернігів"
  ];

  if (!isOpen) return null;

  return (
    <div className="city-modal-overlay">
      <div className="city-modal-content">
        <div className="city-modal-header">
          <h2>Виберіть або введіть своє місто</h2>
          <button className="city-modal-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="city-search-container">
          <input
            type="text"
            className="city-search-input"
            placeholder="Введіть назву населеного пункту"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="city-search-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        
        <div className="city-grid">
          {cities.map((city, index) => (
            <div 
              key={index} 
              className={`city-item ${city === "Дніпро" ? "city-active" : ""}`}
              onClick={() => {
                onSelectCity(city);
                onClose();
              }}
            >
              {city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CitySelectionModal;