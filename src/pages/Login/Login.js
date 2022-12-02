import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import MainContext from "../../store/main-context";
import "./Login.scss";

const Login = () => {
  const mainCtx = useContext(MainContext);
  const [loginFormState, setLoginFormState] = useState({
    username: "",
    password: "",
  });

  const [loginFormValid, setLoginFormValid] = useState({
    username: null,
    password: null,
  });

  const [loginInvalid, setLoginInvalid] = useState(false);

  return (
    <div className="login">
      <h1>Login to your account</h1>
      <form
        className="login__form"
        onSubmit={event =>
          mainCtx.getLoginData(
            event,
            loginFormState,
            setLoginFormValid,
            setLoginInvalid
          )
        }
      >
        <div className="login__inputs">
          <Input
            form="login"
            label="username"
            name="username"
            setFormState={setLoginFormState}
            valid={loginFormValid.username}
          />
          <Input
            form="login"
            label="password"
            name="password"
            type="password"
            setFormState={setLoginFormState}
            valid={loginFormValid.password}
          />
        </div>
        {loginInvalid && (
          <p className="input__invalid">
            please check your username or password, something is not right
          </p>
        )}
        <div className="login__actions">
          <Button type="login">Login</Button>
        </div>
        <p className="login__text">
          No account? You can register{" "}
          <Link to="/register" className="login__link">
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
