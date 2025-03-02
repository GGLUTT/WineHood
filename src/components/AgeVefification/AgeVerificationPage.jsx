import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AgeVerificationPage.css'; 

const AgeVerificationModal = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    localStorage.setItem('ageVerified', 'true');
    
    const redirectPath = localStorage.getItem('redirectAfterVerification') || '/';
    localStorage.removeItem('redirectAfterVerification');
    
    navigate(redirectPath);
  };

  const handleDeny = () => {
    navigate('/age-restriction');
  };

  return (
    <div className="age-verification-container">
      <div className="age-verification-modal">
        <h2>Підтвердження віку</h2>
        <p>Вам вже виповнилося 18 років?</p>
        {error && <p className="error-message">{error}</p>}
        <div className="buttons-container">
          <button className="confirm-button" onClick={handleVerify}>
            Так, мені вже 18+
          </button>
          <button className="deny-button" onClick={handleDeny}>
            Ні, мені менше 18
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;