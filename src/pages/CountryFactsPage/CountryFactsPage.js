import "./CountryFactsPage.scss";
import { useState } from "react";
import Message from "../../components/Message/Message";
import Button from "../../components/Button/Button";

function CountryFactsPage() {
  document.title = "Country Facts";
  const [countryRequest, setCountryRequest] = useState("");
  const [message, setMessage] = useState(null);

  const handleChangeInput = (event) => {
    setCountryRequest(event.target.value);
  };

  const isFormValid = () => {
    // Input field is required
    if (!countryRequest) {
      return false;
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      //make an axios request
      setMessage("submitted");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    } else {
      setMessage("error");
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };

  return (
    <section className="country-facts-section">
      <form onSubmit={handleFormSubmit} className="country-facts-section__form">
        <label
          className="country-facts-section__label"
          htmlFor="countryRequest"
        >
          Which country would you like to visit?
        </label>
        <input
          className="country-facts-section__input"
          name="countryRequest"
          id="countryRequest"
          placeholder="Input a country name"
          onChange={handleChangeInput}
          value={countryRequest}
        />
        <Button text="Find" />
      </form>
      {message && <Message message={message} />}
    </section>
  );
}

export default CountryFactsPage;
