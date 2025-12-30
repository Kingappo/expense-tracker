import { useContext } from "react";
import { AppContent } from "../context/AppContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const PrivateRoute = () => {
  const { isLoggedin } = useContext(AppContent);
  const location = useLocation();

  return isLoggedin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export const PublicRoute = () => {
  const { isLoggedin } = useContext(AppContent);
  const location = useLocation();

  if (
    isLoggedin &&
    (location.pathname === "/login" || location.pathname === "/reset-password")
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
