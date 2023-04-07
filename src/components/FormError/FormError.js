import "./FormError.scss";
import errorIcon from "../../assets/icons/error-24px.svg";

function Message({ message }) {
  return (
    <div className="app-message">
      <img src={errorIcon} alt="error icon" />
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
}
export default Message;
