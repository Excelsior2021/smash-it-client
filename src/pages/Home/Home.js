import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import Button from "../../components/Button/Button";
import AuthContext from "../../store/auth-context";
import "./Home.scss";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const landing = (
    <div className="home__landing">
      <h1 className="home__slogan">Performance tracking for table tennis.</h1>
      <div className="home__actions">
        <Button type="home" click={() => navigate(`login`)}>
          Login
        </Button>
        <Button type="home" click={() => navigate(`register`)}>
          Register
        </Button>
      </div>
    </div>
  );

  return (
    <div className="home">
      {!authCtx.isLoggedIn && landing}
      {authCtx.isLoggedIn && <Dashboard />}
    </div>
  );
};

export default Home;
