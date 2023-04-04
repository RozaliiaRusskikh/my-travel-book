import "./Button.scss";
import { useNavigate } from "react-router-dom";

function Button({ text }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/country-facts");
  };

  return (
    <button onClick={handleButtonClick} className="button">
      {text}
    </button>
  );
}

export default Button;
