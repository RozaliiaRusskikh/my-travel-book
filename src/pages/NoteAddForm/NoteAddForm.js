import "./NoteAddForm.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormError from "../../components/FormError/FormError";
import Button from "../../components/Button/Button";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NoteForm() {
  const countriesAPI = "https://restcountries.com/v3.1/all";
  const empty = "This field is required";

  const [countryNames, setCountryNames] = useState([]);

  const [emptyPin, setEmptyLandPin] = useState(false);
  const [emptyDescription, setEmptyDescription] = useState(false);
  const [emptyCountry, setEmptyCountry] = useState(false);
  const [emptyYear, setEmptyYear] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    axios
      .get(countriesAPI)
      .then((response) => {
        if (response.status === 200) {
          const countries = response.data;
          const names = countries.map((country) => ({
            value: country.name.common.toLowerCase(),
            label: country.name.common,
          }));
          setCountryNames(names);
        }
      })
      .catch((error) => {
        console.error(
          "We are having a problem accessing the posts API: " + error
        );
      });
  }, []);

  let navigate = useNavigate();
  const goToTravelNotesPage = () => {
    navigate("/travel-notes");
  };

  const handleNameChange = (event) => {
    setDescription(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setName(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit} className="note-form">
      <h2 className="note-form__title">
        Please enter information about your trip to create your travel note:
      </h2>
      <label className="note-form__label" htmlFor="name">
        Location on Map
      </label>
      <input
        className={`note-form__input-box ${
          emptyPin ? "form__input--invalid" : ""
        }`}
        id="name"
        type="text"
        name="name"
        value={name}
        onChange={handleNameChange}
      ></input>
      {emptyPin && <FormError message={empty} />}
      <label className="note-form__label" htmlFor="description">
        Description
      </label>
      <textarea
        rows="5"
        id="description"
        className={`note-form__input-box ${
          emptyDescription ? "form__input--invalid" : ""
        }`}
        type="text"
        name="description"
        value={description}
        onChange={handleDescriptionChange}
      ></textarea>
      {emptyDescription && <FormError message={empty} />}
      <Select
        className="note-form__select"
        value={selectedCountry}
        onChange={handleCountryChange}
        placeholder="Select a country"
        options={countryNames}
        isSearchable
      />
      {emptyCountry && <FormError message={empty} />}
      <DatePicker
        className="note-form__date-picker"
        selected={selectedYear ? new Date(selectedYear, 0, 1) : null}
        onChange={(date) => setSelectedYear(date.getFullYear())}
        isClearable
        dateFormat="yyyy"
        placeholderText="Select year"
        showYearPicker
      />
      {emptyYear && <FormError message={empty} />}
      <div className="note-form__buttons">
        <Button onClick={goToTravelNotesPage} text="Cancel" />
        <Button type="submit" text="Save" />
      </div>
    </form>
  );
}

export default NoteForm;
