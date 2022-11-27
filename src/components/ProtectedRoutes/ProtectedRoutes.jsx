import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  return localStorage.token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
