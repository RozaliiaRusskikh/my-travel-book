import "./AddButton.scss";
import { Link } from "react-router-dom";
import addButton from "../../assets/icons/add-button.svg";

function AddButton({ path }) {
  return (
    <div className="add-button">
      <Link to={path}>
        <img className="add-button__icon" src={addButton} alt="add icon" />
      </Link>
    </div>
  );
}

export default AddButton;
