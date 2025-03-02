// src/components/FormInput/FormInput.js
import React from 'react';
import './FormInput.css';

function FormInput({ type, name, value, onChange, placeholder, className }) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`form-input ${className || ''}`}
    />
  );
}

export default FormInput;