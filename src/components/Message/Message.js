import "./Message.scss";

function Message({ message }) {
  const messages = {
    submitted: "Success! Below, you'll find some facts about the country",
    error: "Request failed. Please provide a valid input",
    duplicate: "Post about this location already exists"
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
