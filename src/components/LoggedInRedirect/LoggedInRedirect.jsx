import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import MainContext from "../../store/main-context";
import { Outlet, Navigate } from "react-router-dom";

const LoggedInRedirect = () => {
  const authCtx = useContext(AuthContext);
  const mainCtx = useContext(MainContext);
  return authCtx.isLoggedIn ? (
    <Navigate to={`${mainCtx.baseURL}/${mainCtx.user.username}/dashboard`} />
  ) : (
    <Outlet />
  );
};

export default LoggedInRedirect;
