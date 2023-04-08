import "./Message.scss";

function Message({ message }) {
  const messages = {
    submitted: "Success! Below, you'll find some facts about the country",
    error: "Request failed. Please provide a valid country name",
    errorForm: "Request failed. Please make sure you are creating a post with the unique place",
    created: "Success! You have created a new note!",
    deleted: "Note has been deleted!",
    updated: "Note has been updated!"
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
