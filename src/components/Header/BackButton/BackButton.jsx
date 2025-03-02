// src/components/BackButton/BackButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './BackButton.css';
import arrowLeftIcon from '../../../img/ico/arrow.svg';

const BackButton = ({ text, to }) => {
  return (
    <Link to={to} className="back-button">
      <img src={arrowLeftIcon} alt="Back" className="back-icon" />
      <span>{text}</span>
    </Link>
  );
};

export default BackButton;