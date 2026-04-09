import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuth } from '../api/client';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const auth = getAuth();

  if (!auth?.token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;