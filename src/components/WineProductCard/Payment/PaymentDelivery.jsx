import React, { useState } from "react";
import "./PaymentDelivery.css";
import CitySelectionModal from "../CitySelectionModal/CitySelectionModal.jsx";
import card from "../../../img/ico/card.svg"
import card2 from "../../../img/ico/2cards.svg"
import license from "../../../img/ico/license.svg"
import arrow from "../../../img/ico/arrow-down.svg"

const PaymentDelivery = () => {
  const [selectedCity, setSelectedCity] = useState("Київ");
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="payment-delivery-section">
      <div className="delivery-section">
        <h2 className="section-title">ДОСТАВКА</h2>
        
        <div className="location-selector">
          <span className="location-label">Ваше місто</span>
          <div 
            className="city-dropdown"
            onClick={() => setIsCityModalOpen(true)}
          >
            <span>{selectedCity}</span>
            <img src={arrow} alt="Arrow down" width={15} className="dropdown-icon" />
          </div>
        </div>
        
        <div className="delivery-option">
          <h3 className="option-title">Самовивіз</h3>
          <p className="option-description">
            WINEHOOD, пр.Бажана 28е, (м) Осокорки. Товар буде зібрано протягом години 
            після підтвердження оператором. Забрати замовлення можна протягом 3-х 
            днів. Замовлення зроблені у неділю будуть оброблені на наступний робочий 
            день.
          </p>
        </div>
        
        <div className="delivery-option">
          <h3 className="option-title">Кур'єрська доставка</h3>
          <p className="option-description">
            По {selectedCity} до дверей від 1000 гривень безкоштовно.
          </p>
        </div>
        
        <div className="delivery-option">
          <h3 className="option-title">Новою поштою</h3>
          <p className="option-description">
            По Україні згідно тарифів «Нової Пошти», від 1000 гривень безкоштовно.
            При виборі способу оплати «Готівкою при отриманні» отримувач сплачує за
            послугу «Післяплата» за тарифами НП (20 грн + 2% від суми замовлення)
          </p>
        </div>
      </div>
      
      <div className="verification-notice">
        <p>
          Перевіряйте, будь ласка, своє замовлення відразу при 
          отриманні ( кількість, наявність усіх товарів відповідно
          до товарної накладної, їх цілісність). У разі
          невідповідності зв'яжіться, будь ласка з нами.
        </p>
      </div>
      
      <div className="payment-sections">
        <h2 className="section-title">ОПЛАТА</h2>
        
        <div className="payment-options">
          <div className="payment-option">
            <span className="payment-option-icon">
              <img src={card} alt="Visa/MasterCard" />
            </span>
            <h3 className="option-title">Visa/MasterCard (онлайн)</h3>
          </div>
          
          <div className="payment-option">
            <span className="payment-option-icon">
              <img src={card2} alt="Безготівковий розрахунок" />
            </span>
            <h3 className="option-title">Безготівковий розрахунок, рахунок-фактура</h3>
          </div>
          
          <div className="payment-option">
            <span className="payment-option-icon">
              <img src={card} alt="Готівкою при отриманні" />
            </span>
            <h3 className="option-title">Готівкою при отриманні</h3>
          </div>
          
          <div className="payment-option">
            <span className="payment-option-icon">
              <img src={license} alt="Подарункові сертифікати" />
            </span>
            <h3 className="option-title">Подарунковими сертифікатами WINEHOOD</h3>
          </div>
        </div>
      </div>

      <CitySelectionModal 
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        onSelectCity={handleCitySelect}
      />
    </div>
  );
};

export default PaymentDelivery;