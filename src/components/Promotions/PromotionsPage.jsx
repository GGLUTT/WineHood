import React, { useEffect } from 'react';
import ExclusiveOffers from '../HomePage/ExclusiveOffers/ExclusiveOffers';
import Footer from '../Footer/Footer';

const PromotionsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="promotions-page" style={{ paddingTop: '40px' }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '36px', color: '#C10000', textTransform: 'uppercase' }}>Акції та Спеціальні Пропозиції</h1>
        <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '10px auto 0' }}>
          Відкрийте для себе найкращі пропозиції від WineHood. Ексклюзивні знижки на колекційні вина та улюблені смаки.
        </p>
      </div>
      <ExclusiveOffers />
      <Footer />
    </div>
  );
};

export default PromotionsPage;
