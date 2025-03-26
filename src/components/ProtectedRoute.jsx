// src/components/ProtectedRoute/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Перевіряємо наявність токена
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    // Поки перевіряємо авторизацію, можна показати спіннер завантаження
    return <div className="loading-spinner">Завантаження...</div>;
  }

  // Якщо користувач не авторизований, перенаправляємо на сторінку входу
  if (!isAuthenticated) {
    // Зберігаємо поточний шлях, щоб після авторизації повернутися на нього
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Якщо користувач авторизований, показуємо захищену сторінку
  return children;
};

export default ProtectedRoute;