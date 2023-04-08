import "./Message.scss";

function Message({ message }) {
  const messages = {
    submitted: "Success! Below, you'll find some facts about the country",
    error: "Request failed. Please provide a valid country name",
    errorForm: "Request failed. Please make sure you are creating an item with the unique name",
    created: "Success! You have created a new item!",
    deleted: "Item has been deleted!",
    updated: "Item has been updated!"
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
