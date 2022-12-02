import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import MainContext from "../../store/main-context";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import "./Logo.scss";

const Logo = () => {
  const authCtx = useContext(AuthContext);
  const mainCtx = useContext(MainContext);
  return (
    <div className="logo">
      <Link
        to={authCtx.isLoggedIn ? `/${mainCtx.user.username}/dashboard` : "/"}
      >
        <img src={logo} alt="logo" className="logo__img" />
      </Link>
    </div>
  );
};

export default Logo;
