import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CartProvider } from './components/Context/CartContext.jsx';
import ForgotPasswordPage from './components/Header/ForgotPassword/ForgotPasswordPage';
import HomePage from './components/HomePage/HomePage';
import RegisterPage from './components/Header/Register/RegisterPage';
import LoginPage from './components/Header/Login/LoginPage';
import NotFound from './components/NotFound/NotFound';
import AgeVerificationModal from './components/AgeVefification/AgeVerificationModal';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';
import WineCatalog from './components/WineCatalog/WineCatalog';
import ProductDetail from './components/WineProductCard/ProductDetail';
import Checkout from './components/CheckOut/CheckOut.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <AgeVerificationModal />
        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/welcome-test" element={<WelcomeScreen />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<WineCatalog />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;