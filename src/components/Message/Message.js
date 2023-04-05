import "./Message.scss";

function Message({ message }) {
  const messages = {
    submitted: "Form has been submitted",
    error: "Failed to submit the form",
  };
  return (
    <div className="app-message">
      <div className={`app-message--${message}`}>
        <strong>{messages[message]}</strong>
      </div>
    </div>
  );
}
export default Message;
