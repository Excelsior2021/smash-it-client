import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () =>
  localStorage.token ? <Outlet /> : <Navigate to="/login" />;

export default ProtectedRoutes;
