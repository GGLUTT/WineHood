// src/App.js
// import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ForgotPasswordPage from './components/Header/ForgotPassword/ForgotPasswordPage';
import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/Header/Register/RegisterPage';
import LoginPage from './components/Header/Login/LoginPage';
import AgeRestrictionPage from './components/AgeRestriction/AgeRestrictionPage';
import AgeVerificationModal from './components/AgeVefification/AgeVerificationPage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/age-verification" element={<AgeVerificationModal />} />
        <Route path="/age-restriction" element={<AgeRestrictionPage />} />
          
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;