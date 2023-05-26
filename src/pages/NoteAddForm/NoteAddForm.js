import "./NoteAddForm.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import globe from "../../assets/images/globe.jpeg";
import globeWebp from "../../assets/images/globe.webp";
import axios from "axios";
import FormError from "../../components/FormError/FormError";
import Button from "../../components/Button/Button";
import Select from "react-select";
import Message from "../../components/Message/Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "lazysizes";

function NoteAddForm() {
  document.title = "Add New Note";
  const countriesAPI = "https://restcountries.com/v3.1/all";
  const baseURL = process.env.REACT_APP_API_URL;

  const empty = "This field is required";

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

    return true;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("year", selectedYear);
    formData.append("country", selectedCountry.label);
    formData.append("image_path", `${baseURL}/${image.name}`);
    formData.append("long", long);
    formData.append("lat", lat);
    formData.append("title", title);

    if (isFormValid()) {
      axios
        .post(`${baseURL}/posts`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.status === 201) {
            //redirect to the Travel Notes page and display a flash message
            setFlashMessage("created");
            setTimeout(() => {
              goToTravelNotesPage();
            }, 2000);
          }
        })
        .catch((error) => {
          setFlashMessage("errorForm");
          console.error("We are having a problem accessing the API: " + error);
        });
    } else {
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
    }
  };

  function setFlashMessage(message) {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  return (
    <>
      <picture>
        <source srcset={globeWebp} type="image/webp" />
        <img
          className="note-add-form__bottom-image lazyload"
          data-sizes="auto"
          data-src={globe}
          alt="globe"
        />
      </picture>
      <form
        onSubmit={handleFormSubmit}
        className="note-add-form"
        encType="multipart/form-data"
      >
        <h2 className="note-add-form__title">
          Please enter information about your trip to create your travel note
        </h2>
        {message && <Message message={message} />}
        <div className="note-add-form__table">
          <div className="note-add-form__left">
            <label className="note-add-form__label" htmlFor="name">
              Place:
            </label>
            <input
              className={`note-add-form__input-box ${
                emptyPin ? "note-add-form__input-box--invalid" : ""
              }`}
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
            ></input>
            {emptyPin && <FormError message={empty} />}
            <label className="note-add-form__label" htmlFor="long">
              Longitude:
            </label>
            <input
              className={`note-add-form__input-box ${
                emptyLong ? "note-add-form__input-box--invalid" : ""
              }`}
              id="long"
              type="number"
              name="long"
              value={long}
              onChange={handleLongChange}
            ></input>
            {emptyLong && <FormError message={empty} />}
            <label className="note-add-form__label" htmlFor="lat">
              Latitude:
            </label>
            <input
              className={`note-add-form__input-box ${
                emptyLat ? "note-add-form__input-box--invalid" : ""
              }`}
              id="lat"
              type="number"
              name="lat"
              value={lat}
              onChange={handleLatChange}
            ></input>
            {emptyLat && <FormError message={empty} />}
            <label className="note-add-form__label" htmlFor="country">
              Country:
            </label>
            <Select
              id="country"
              className="note-add-form__select"
              value={selectedCountry}
              onChange={handleCountryChange}
              placeholder="Select a country..."
              options={countryNames}
              isSearchable
            />
            {emptyCountry && <FormError message={empty} />}
          </div>
          <div className="note-add-form__right">
            <label className="note-add-form__label" htmlFor="title">
              Title:
            </label>
            <input
              className={`note-add-form__input-box ${
                emptyTitle ? "note-add-form__input-box--invalid" : ""
              }`}
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={handleTitleChange}
            ></input>
            {emptyTitle && <FormError message={empty} />}
            <label className="note-add-form__label" htmlFor="description">
              Description:
            </label>
            <textarea
              rows="9"
              id="description"
              className={`note-add-form__input-box ${
                emptyDescription ? "note-add-form__input-box--invalid" : ""
              }`}
              type="text"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            {emptyDescription && <FormError message={empty} />}
            <label className="note-add-form__label" htmlFor="year">
              Year:
            </label>
            <DatePicker
              id="year"
              className="note-add-form__date-picker"
              selected={selectedYear ? new Date(selectedYear, 0, 1) : null}
              onChange={(date) => setSelectedYear(date.getFullYear())}
              dateFormat="yyyy"
              placeholderText="Select year..."
              showYearPicker
            />
            {emptyYear && <FormError message={empty} />}
            <label className="note-add-form__label" htmlFor="image">
              Image:
            </label>
            <input
              filename={image}
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="note-add-form__image"
            />
            {emptyImage && <FormError message={empty} />}
          </div>
        </div>
        <div className="note-add-form__buttons">
          <Button type="submit" text="Save" />
          <Button onClick={goToTravelNotesPage} text="Cancel" />
        </div>
      </form>
    </>
  );
}

export default NoteAddForm;
