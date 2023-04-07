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
  const [emptyLong, setEmptyLong] = useState(false);
  const [emptyLat, setEmptyLat] = useState(false);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [emptyImage, setEmptyImage] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [long, setLong] = useState("");
  const [lat, setLat] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

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
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleLatChange = (event) => {
    setLat(event.target.value);
  };

  const handleLongChange = (event) => {
    setLong(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit} className="note-form">
      <h2 className="note-form__title">
        Please enter information about your trip to create your travel note
      </h2>
      <div className="note-form__table">
        <div className="note-form__left">
          <label className="note-form__label" htmlFor="name">
            Place:
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
          <label className="note-form__label" htmlFor="long">
            Longitude:
          </label>
          <input
            className={`note-form__input-box ${
              emptyLong ? "form__input--invalid" : ""
            }`}
            id="long"
            type="number"
            name="long"
            value={long}
            onChange={handleLongChange}
          ></input>
          {emptyLong && <FormError message={empty} />}
          <label className="note-form__label" htmlFor="lat">
            Latitude:
          </label>
          <input
            className={`note-form__input-box ${
              emptyLat ? "form__input--invalid" : ""
            }`}
            id="lat"
            type="number"
            name="lat"
            value={lat}
            onChange={handleLatChange}
          ></input>
          {emptyLat && <FormError message={empty} />}
          <label className="note-form__label" htmlFor="country">
            Country:
          </label>
          <Select
            id="country"
            className="note-form__select"
            value={selectedCountry}
            onChange={handleCountryChange}
            placeholder="Select a country..."
            options={countryNames}
            isSearchable
          />
          {emptyCountry && <FormError message={empty} />}
        </div>
        <div className="note-form__right">
          <label className="note-form__label" htmlFor="title">
            Title:
          </label>
          <input
            className={`note-form__input-box ${
              emptyTitle ? "form__input--invalid" : ""
            }`}
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          ></input>
          {emptyTitle && <FormError message={empty} />}
          <label className="note-form__label" htmlFor="description">
            Description:
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
          <label className="note-form__label" htmlFor="year">
            Year:
          </label>
          <DatePicker
            id="year"
            className="note-form__date-picker"
            selected={selectedYear ? new Date(selectedYear, 0, 1) : null}
            onChange={(date) => setSelectedYear(date.getFullYear())}
            isClearable
            dateFormat="yyyy"
            placeholderText="Select year..."
            showYearPicker
          />
          {emptyYear && <FormError message={empty} />}
          <label className="note-form__label" htmlFor="image">
            Image:
          </label>
          <input
            id="image"
            type="file"
            onChange={handleImageUpload}
            className="note-form__image"
          />
          {emptyImage && <FormError message={empty} />}
        </div>
      </div>
      <div className="note-form__buttons">
        <Button onClick={goToTravelNotesPage} text="Cancel" />
        <Button type="submit" text="Save" />
      </div>
    </form>
  );
}

export default NoteForm;
