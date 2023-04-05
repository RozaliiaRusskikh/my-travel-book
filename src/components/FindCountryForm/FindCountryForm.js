import "./FindCountryForm.scss";
import Message from "../Message/Message";
import Button from "../Button/Button";
import { useState } from "react";

function FindCountryForm() {
  const [countryRequest, setCountryRequest] = useState("");
  const [message, setMessage] = useState(null);

  const handleChangeInput = (event) => {
    setCountryRequest(event.target.value);
  };

  const isInputValid = () => {
    // Input must be alphabetical
    const regex = /^[a-zA-Z\s]*$/;
    if (!countryRequest.match(regex)) {
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    if (!countryRequest) {
      return false;
    }

    if (!isInputValid()) {
      return false;
    }
    return true;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      //make an axios request
      setFlashMessage("submitted");
      setCountryRequest("");
    } else {
      setFlashMessage("error");
    }
  };
  function setFlashMessage(message) {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }

  return (
    <form onSubmit={handleFormSubmit} className="find-country-form">
      {message && <Message message={message} />}
      <label className="find-country-form__label" htmlFor="countryRequest">
        Which country would you like to visit?
      </label>
      <input
        className="find-country-form__input"
        name="countryRequest"
        id="countryRequest"
        placeholder="Input a country name"
        onChange={handleChangeInput}
        value={countryRequest}
      />
      <Button text="Find" />
    </form>
  );
}

export default FindCountryForm;
