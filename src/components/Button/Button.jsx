import "./Button.scss";

const Button = ({ type, modifier, click, disabled, children }) => {
  return (
    <>
      {!disabled && (
        <button
          className={`button button--${type} button--${type}--${modifier}`}
          onClick={click}
        >
          {children}
        </button>
      )}
      {disabled && (
        <button
          className={`button button--${type} button--${type}--${modifier}`}
          onClick={click}
          disabled
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
