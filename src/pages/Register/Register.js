import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../../store/main-context";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Demo from "../../components/Demo/Demo";
import "./Register.scss";

const Register = () => {
  const mainCtx = useContext(MainContext);
  const [registerFormState, setRegisterFormState] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    username: "",
    password: "",
    passwordCheck: "",
  });

  const [registerFormValid, setRegisterFormValid] = useState({
    firstName: null,
    lastName: null,
    dob: null,
    email: null,
    username: null,
    password: null,
    passwordCheck: null,
  });

  const [usernameValid, setUsernameValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [passwordCheckValid, setPasswordCheckValid] = useState(null);

  return (
    <div>
      <h1>Register for an account</h1>
      <form
        className="register__form"
        onSubmit={event =>
          mainCtx.createAccountHandler(
            event,
            registerFormState,
            setRegisterFormValid,
            setUsernameValid,
            setPasswordValid,
            setPasswordCheckValid
          )
        }
      >
        <div className="register__inputs">
          <div className="register__details register__details--personal">
            <h2>personal details</h2>
            <Input
              form="register"
              label="first name"
              name="firstName"
              setFormState={setRegisterFormState}
              valid={registerFormValid.firstName}
            />
            <Input
              form="register"
              label="last name"
              name="lastName"
              setFormState={setRegisterFormState}
              valid={registerFormValid.lastName}
            />
            <Input
              form="register"
              label="date of birth"
              name="dob"
              type="date"
              setFormState={setRegisterFormState}
              valid={registerFormValid.dob}
            />
            <Input
              form="register"
              label="email"
              name="email"
              type="email"
              setFormState={setRegisterFormState}
              valid={registerFormValid.email}
            />
          </div>

          <div className="register__details register__details--account">
            <h2>account details</h2>
            <Input
              form="register"
              label="username"
              name="username"
              setFormState={setRegisterFormState}
              valid={registerFormValid.username}
              usernameValid={usernameValid}
            />
            <Input
              form="register"
              label="password"
              name="password"
              type="password"
              setFormState={setRegisterFormState}
              valid={registerFormValid.password}
              passwordValid={passwordValid}
            />
            <Input
              form="register"
              label="re-type password"
              name="passwordCheck"
              type="password"
              setFormState={setRegisterFormState}
              valid={registerFormValid.passwordCheck}
              passwordCheckValid={passwordCheckValid}
            />
          </div>
        </div>
        <div className="register__actions">
          <Button type="register">register</Button>
        </div>
        <p className="register__text">
          Already have an account? You can login{" "}
          <Link to="/login" className="register__link">
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
