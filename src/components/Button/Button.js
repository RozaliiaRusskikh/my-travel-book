import "./Button.scss";

function Button({ text, onClick, isDisabled}) {
  return (
    <button onClick={onClick} className={isDisabled ? "button button--disabled" : "button"}>
      {text}
    </button>
  );
}

export default Button;
