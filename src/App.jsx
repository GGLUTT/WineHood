// src/App.js
// import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ForgotPasswordPage from './components/Header/ForgotPassword/ForgotPasswordPage';
import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/Header/Register/RegisterPage';
import LoginPage from './components/Header/Login/LoginPage';
import NotFound from './components/NotFound/NotFound';
import AgeVerificationModal from './components/AgeVefification/AgeVerificationModal';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';



function App() {
  return (
    <Router>
    <AgeVerificationModal />
    <Routes>
     <Route path="/welcome-test" element={<WelcomeScreen />} />

      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
  );
}

export default App;