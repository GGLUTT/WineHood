import React, { useEffect, useState } from 'react';
import './AgeVerificationModal.css';

const AgeVerificationModal = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Перевіряємо, чи вже була перевірка віку раніше
    const ageVerified = localStorage.getItem('ageVerified');
    
    // Встановлюємо видимість модального вікна
    if (ageVerified === 'true') {
      setIsVisible(false);
    } else {
      setIsVisible(true);
      // Очищаємо localStorage, якщо там встановлено невірне значення
      if (ageVerified !== null && ageVerified !== 'true') {
        localStorage.removeItem('ageVerified');
      }
    }
    
    // Блокуємо скролінг сторінки, коли модальне вікно видиме
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  const handleVerify = () => {
    // Зберігаємо результат перевірки в localStorage
    localStorage.setItem('ageVerified', 'true');
    setIsVisible(false);
  };

  const handleReject = () => {
    // Перенаправляємо на сторінку для неповнолітніх або на головну сторінку
    window.location.href = 'https://www.google.com'; // Змініть URL на потрібний
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="age-verification-overlay">
      <div className="age-verification-modal">
        <div className="age-verification-content">
          <h2>ХМ, А ВАМ ВЖЕ Є 18?</h2>
          <p>
            Законодавством України заборонено продаж алкоголю особам, які
            не досягли 18-річного віку.
          </p>
          
          <div className="age-verification-buttons">
            <button className="reject-button" onClick={handleReject}>
              НІ, МЕНІ ЩЕ НЕМАЄ 18
            </button>
            <button className="confirm-button" onClick={handleVerify}>
              ТАК, МЕНІ ВЖЕ 18
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;