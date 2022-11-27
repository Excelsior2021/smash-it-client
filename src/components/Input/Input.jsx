import "./Input.scss";

const Input = ({
  form,
  label,
  name,
  type,
  value,
  setFormState,
  valid,
  usernameValid,
  passwordValid,
  passwordCheckValid,
  newGroupNameValid,
}) => {
  let lowercase = false;

  if (
    name === "firstName" ||
    name === "lastName" ||
    name === "username" ||
    name === "joinGroup" ||
    name === "groupName"
  ) {
    lowercase = true;
  }

  const setValue = value => {
    let changedValue;
    lowercase ? (changedValue = value.toLowerCase()) : (changedValue = value);
    setFormState(prevState => ({
      ...prevState,
      [name]: changedValue,
    }));
  };

  return (
    <div className={`input input--${form}`}>
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input__input"
        name={name}
        type={type ? type : "text"}
        onChange={event => setValue(event.target.value)}
        min="0"
        max="11"
        defaultValue={
          value && form === "record-match"
            ? value
            : form === "record-match"
            ? 0
            : ""
        }
      />
      {(form === "register" || form === "create-group") &&
        !valid &&
        valid !== null &&
        name !== "dob" && (
          <p className="input__invalid">field can not be empty</p>
        )}
      {form === "login" && !valid && valid !== null && name === "username" && (
        <p className="input__invalid">please enter your username</p>
      )}
      {form === "login" && !valid && valid !== null && name === "password" && (
        <p className="input__invalid">please enter your password</p>
      )}
      {!valid && valid !== null && name === "dob" && (
        <p className="input__invalid">please choose your date of birth</p>
      )}
      {form === "register" &&
        valid &&
        !usernameValid &&
        name === "username" && (
          <p className="input__invalid">
            username already exists, please choose another
          </p>
        )}
      {form === "register" &&
        valid &&
        !passwordValid &&
        name === "password" && (
          <p className="input__invalid">
            password needs to be at least 6 characters
          </p>
        )}
      {valid && !passwordCheckValid && name === "passwordCheck" && (
        <p className="input__invalid">passwords do not match</p>
      )}
      {valid && !newGroupNameValid && name === "groupName" && (
        <p className="input__invalid">
          group name already exists, please choose another
        </p>
      )}
    </div>
  );
};

export default Input;
