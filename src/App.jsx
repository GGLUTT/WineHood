import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import ProductDetail from './components/WineProductCard/ProductDetail.jsx';
import Checkout from './components/CheckOut/CheckOut.jsx';
import OrderSuccess from './components/OrderSuccess/OrderSuccess.jsx';
import PersonalAccount from './components/PersonalAccount/PersonalAccount.jsx';
import Breadcrumbs from './components/Breadcrumbs/Breadcrumbs';
import Header from './components/Header/Header';

function AppContent() {
  const location = useLocation();
  const noBreadcrumbsPaths = ['/register', '/login', '/forgot-password', '/catalog'];
  const isNotFoundPage = location.pathname !== '/' && !location.pathname.startsWith('/catalog') && 
                         !location.pathname.startsWith('/product') && location.pathname !== '/checkout' && 
                         location.pathname !== '/order-success' && location.pathname !== '/account';
  const shouldShowBreadcrumbs = !noBreadcrumbsPaths.includes(location.pathname) && !isNotFoundPage;

  return (
    <>
      <AgeVerificationModal />
      <Header />
      {shouldShowBreadcrumbs && <Breadcrumbs />}
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/welcome-test" element={<WelcomeScreen />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<WineCatalog />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/account" element={<PersonalAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;