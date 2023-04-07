import "./AddButton.scss";
import { Link } from "react-router-dom";
import addButton from "../../assets/icons/add-button.svg";

function AddButton({ path }) {
  return (
    <Link to={path}>
      <img className="add-button" src={addButton} alt="add icon" />
    </Link>
  );
}

export default AddButton;
