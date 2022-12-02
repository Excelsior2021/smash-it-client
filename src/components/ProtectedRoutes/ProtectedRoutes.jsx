import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () =>
  localStorage.token ? <Outlet /> : <Navigate to="smash-it/login" />;

export default ProtectedRoutes;
