import "./AttractionAddForm.scss";
import globe from "../../assets/images/globe.jpeg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormError from "../../components/FormError/FormError";
import Button from "../../components/Button/Button";
import Message from "../../components/Message/Message";
import { useParams } from "react-router-dom";

function AttractionAddForm() {
  document.title = "Add New Attraction";
  const baseURL = process.env.REACT_APP_API_URL;
  const { postId } = useParams();

  const empty = "This field is required";

  const [message, setMessage] = useState(null);

  const [emptyName, setEmptyName] = useState(false);
  const [emptyDescription, setEmptyDescription] = useState(false);
  const [emptyImage, setEmptyImage] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  let navigate = useNavigate();
  const goToTripDetailsPage = () => {
    navigate(`/travel-notes/${postId}`);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const isFieldEmpty = (input) => {
    if (input.length === 0) {
      return true;
    }
    return false;
  };

  const isFormValid = () => {
    if (!name || !description || !image) {
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
    formData.append("post_id", postId);

    if (isFormValid()) {
      axios
        .post(`${baseURL}/posts/${postId}/attractions`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.status === 201) {
            //redirect to the Trip Details Page page and display a flash message
            setFlashMessage("created");
            setTimeout(() => {
              goToTripDetailsPage();
            }, 2000);
          }
        })
        .catch((error) => {
          setFlashMessage("errorForm");
          console.error("We are having a problem accessing the API: " + error);
        });
    } else {
      if (isFieldEmpty(name)) {
        setEmptyName(true);
      } else {
        setEmptyName(false);
      }
      if (isFieldEmpty(description)) {
        setEmptyDescription(true);
      } else {
        setEmptyDescription(false);
      }
      if (isFieldEmpty(image)) {
        setEmptyImage(true);
      } else {
        setEmptyImage(false);
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
      <img
        className="attraction-form-add__bottom-image"
        src={globe}
        alt="globe"
      />
      <form
        onSubmit={handleFormSubmit}
        className="attraction-form-add"
        encType="multipart/form-data"
      >
        <h2 className="attraction-form-add__title">
          Please enter information about an attraction to create your card
        </h2>
        {message && <Message message={message} />}
        <label className="attraction-form-add__label" htmlFor="name">
          Title:
        </label>
        <input
          className={`attraction-form-add__input-box ${
            emptyName ? "attraction-form-add__input-box--invalid" : ""
          }`}
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        ></input>
        {emptyName && <FormError message={empty} />}
        <label className="attraction-form-add__label" htmlFor="description">
          Description:
        </label>
        <textarea
          rows="8"
          id="description"
          className={`attraction-form-add__input-box ${
            emptyDescription ? "attraction-form-add__input-box--invalid" : ""
          }`}
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
        {emptyDescription && <FormError message={empty} />}
        <label className="attraction-form-add__label" htmlFor="image">
          Image:
        </label>
        <input
          filename={image}
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="attraction-form-add__image"
        />
        {emptyImage && <FormError message={empty} />}

        <div className="attraction-form-add__buttons">
          <Button type="submit" text="Save" />
          <Button onClick={goToTripDetailsPage} text="Cancel" />
        </div>
      </form>
    </>
  );
}

export default AttractionAddForm;
