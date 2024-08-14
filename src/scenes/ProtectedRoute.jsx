import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/context/AuthProvider";

export const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Check if the user state is still being determined
  if (user === undefined) {
    return <div>Cargando...</div>; // or a spinner while Firebase checks the auth state
  }

  // If the user is authenticated, render the child components
  // Otherwise, navigate to the login page
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};