import "./NoteAddForm.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormError from "../../components/FormError/FormError";
import Button from "../../components/Button/Button";
import Select from "react-select";
import Message from "../../components/FormError/FormError";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function NoteAddForm() {
  const countriesAPI = "https://restcountries.com/v3.1/all";
  const baseURL = process.env.REACT_APP_API_URL;

  const empty = "This field is required";
  const invalidCoordinates = "Invalid coordinate";

  const [countryNames, setCountryNames] = useState([]);
  const [message, setMessage] = useState(null);

  const [emptyPin, setEmptyLandPin] = useState(false);
  const [emptyDescription, setEmptyDescription] = useState(false);
  const [emptyCountry, setEmptyCountry] = useState(false);
  const [emptyYear, setEmptyYear] = useState(false);
  const [emptyLong, setEmptyLong] = useState(false);
  const [emptyLat, setEmptyLat] = useState(false);
  const [emptyTitle, setEmptyTitle] = useState(false);
  const [emptyImage, setEmptyImage] = useState(false);
  const [incorrectCoordinate, setIncorrectCoordinate] = useState(false);

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

  const handleLatChange = (event) => {
    setLat(event.target.value);
  };

  const handleLongChange = (event) => {
    setLong(event.target.value);
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const isCoordinatesInvalid = () => {
    if (
      lat.match("/^[+-]?(([1-8]?[0-9])(.[0-9]{1,6})?|90(.0{1,6})?)$/") ||
      long.match(
        "/^[+-]?((([1-9]?[0-9]|1[0-7][0-9])(.[0-9]{1,6})?)|180(.0{1,6})?)$/"
      )
    ) {
      return false;
    }

    return true;
  };

  const isFieldEmpty = (input) => {
    if (input.length === 0) {
      return true;
    }
    return false;
  };

  const isFormValid = () => {
    if (
      !name ||
      !description ||
      !selectedYear ||
      !selectedCountry ||
      !image ||
      !long ||
      !lat ||
      !title
    ) {
      return false;
    }

    if (isCoordinatesInvalid()) {
      return false;
    }

    return true;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      axios
        .post(`${baseURL}/posts`, {
          name: name,
          description: description,
          year: selectedYear,
          country: selectedCountry,
          image_path: `${baseURL}/${image.name}`,
          long: long,
          lat: lat,
          title: title,
        })
        .then((response) => {
          if (response.status === 200) {
            //redirect to the Travel Notes page and display a flash message
            goToTravelNotesPage();
            setFlashMessage("submitted");
          } else {
            console.log(response.message);
            setFlashMessage("duplicate");
          }
        })
        .catch((error) => {
          setFlashMessage("error");
          console.error("We are having a problem accessing the API: " + error);
        });
    } else {
      console.log(`${baseURL}/${image.name}`);
      if (isFieldEmpty(name)) {
        setEmptyLandPin(true);
      } else {
        setEmptyLandPin(false);
      }
      if (isFieldEmpty(description)) {
        setEmptyDescription(true);
      } else {
        setEmptyDescription(false);
      }
      if (isFieldEmpty(selectedYear)) {
        setEmptyYear(true);
      } else {
        setEmptyYear(false);
      }
      if (isFieldEmpty(selectedCountry)) {
        setEmptyCountry(true);
      } else {
        setEmptyCountry(false);
      }
      if (isFieldEmpty(image)) {
        setEmptyImage(true);
      } else {
        setEmptyImage(false);
      }
      if (isFieldEmpty(long)) {
        setEmptyLong(true);
      } else {
        setEmptyLong(false);
      }
      if (isFieldEmpty(lat)) {
        setEmptyLat(true);
      } else {
        setEmptyLat(false);
      }
      if (isFieldEmpty(title)) {
        setEmptyTitle(true);
      } else {
        setEmptyTitle(false);
      }
      if (isCoordinatesInvalid()) {
        setIncorrectCoordinate(true);
      } else {
        setIncorrectCoordinate(false);
      }
    }
  };

  function setFlashMessage(message) {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  return (
    <form
      onSubmit={handleFormSubmit}
      className="note-form"
      encType="multipart/form-data"
    >
      <h2 className="note-form__title">
        Please enter information about your trip to create your travel note
      </h2>
      {message && <Message message={message} />}
      <div className="note-form__table">
        <div className="note-form__left">
          <label className="note-form__label" htmlFor="name">
            Place:
          </label>
          <input
            className={`note-form__input-box ${
              emptyPin ? "note-form__input-box--invalid" : ""
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
              emptyLong ? "note-form__input-box--invalid" : ""
            }`}
            id="long"
            type="number"
            name="long"
            value={long}
            onChange={handleLongChange}
          ></input>
          {incorrectCoordinate && <FormError message={invalidCoordinates} />}
          {emptyLong && <FormError message={empty} />}
          <label className="note-form__label" htmlFor="lat">
            Latitude:
          </label>
          <input
            className={`note-form__input-box ${
              emptyLat ? "note-form__input-box--invalid" : ""
            }`}
            id="lat"
            type="number"
            name="lat"
            value={lat}
            onChange={handleLatChange}
          ></input>
          {incorrectCoordinate && <FormError message={invalidCoordinates} />}
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
              emptyTitle ? "note-form__input-box--invalid" : ""
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
              emptyDescription ? "note-form__input-box--invalid" : ""
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
            dateFormat="yyyy"
            placeholderText="Select year..."
            showYearPicker
          />
          {emptyYear && <FormError message={empty} />}
          <label className="note-form__label" htmlFor="image">
            Image:
          </label>
          <input
            name="image"
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

export default NoteAddForm;
