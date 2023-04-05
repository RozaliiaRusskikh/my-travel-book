import "./FindCountryForm.scss";
import { useState } from "react";
import axios from "axios";
import Message from "../Message/Message";
import Button from "../Button/Button";

function FindCountryForm({ getFacts }) {
  const [countryRequest, setCountryRequest] = useState("");
  const [message, setMessage] = useState(null);
  const countriesAPI = "https://restcountries.com/v3.1/name";

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
      axios
        .get(`${countriesAPI}/${countryRequest}`)
        .then((response) => {
          if (response.status === 200) {
            getFacts(response.data);
            setFlashMessage("submitted");
            setCountryRequest("");
          }
        })
        .catch((error) => {
          setFlashMessage("error");
          console.error(
            "We are having a problem accessing the posts API: " + error
          );
        });
    } else {
      setFlashMessage("error");
    }
  };
  function setFlashMessage(message) {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  return (
    <section className="find-country-form">
      <form onSubmit={handleFormSubmit} className="find-country-form__form">
        <label className="find-country-form__label" htmlFor="countryRequest">
          What country would you like to visit?
        </label>
        <input
          className={
            message === "error"
              ? "find-country-form__input find-country-form__input--error"
              : "find-country-form__input"
          }
          name="countryRequest"
          id="countryRequest"
          placeholder="Enter a country name..."
          onChange={handleChangeInput}
          value={countryRequest}
        />
        <Button text="Find" />
        {message && <Message message={message} />}
      </form>
    </section>
  );
}

export default FindCountryForm;
