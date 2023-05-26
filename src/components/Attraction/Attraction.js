import "./Attraction.scss";
import { useState } from "react";
import Message from "../../components/Message/Message";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/icon-delete.svg";
import editIcon from "../../assets/icons/pencil.svg";
import axios from "axios";
import UserContext from "../../context/userContext";
import { useContext } from "react";
import 'lazysizes';

function Attraction({ attraction, index, postId }) {
  const baseURL = process.env.REACT_APP_API_URL;
  const [message, setMessage] = useState(null);
  const { user } = useContext(UserContext);

  function deleteAttraction(id) {
    if (window.confirm("Delete this attraction?")) {
      axios
        .delete(`${baseURL}/posts/${postId}/attractions/${attraction.id}`)
        .then((response) => {
          if (response.status === 204) {
            setFlashMessage("deleted");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        })
        .catch((error) => {
          console.error(
            "We are having a problem accessing the posts API: " + error
          );
        });
    }
  }

  function setFlashMessage(message) {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }
  return (
    <>
      {message && <Message message={message} />}
      <article
        className={
          index % 2 === 0
            ? "attration-section"
            : "attration-section attration-section--image-left"
        }
      >
        <div className="attration-section__content">
          <h3 className="attration-section__heading">{attraction.name}</h3>
          <div className="attraction-section__description-icons">
            <p className="attration-section__description">
              {attraction.description}
            </p>
            {user.isAuthenticated && (
              <div className="attration-section__icons">
                <Link
                  to={`/travel-notes/${postId}/attractions/edit/${attraction.id}/`}
                >
                  <img
                    className="attration-section__edit-icon lazyload"
                    data-sizes="auto"
                    data-src={editIcon}
                    alt="edit icon"
                  />
                </Link>
                <img
                  onClick={() => {
                    deleteAttraction(attraction.id);
                  }}
                  className="attration-section__delete-icon lazyload"
                  data-sizes="auto"
                  data-src={deleteIcon}
                  alt="delete icon"
                />
              </div>
            )}
          </div>
        </div>
        <img
          className="attration-section__image lazyload"
          data-src={attraction.image_path}
          data-sizes="auto"
          alt={attraction.name}
        />
      </article>
    </>
  );
}

export default Attraction;
