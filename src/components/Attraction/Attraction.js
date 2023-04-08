import "./Attraction.scss";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/icon-delete.svg";
import editIcon from "../../assets/icons/pencil.svg";
import axios from "axios";

function Attraction({ attraction, index, postId }) {
  const baseURL = process.env.REACT_APP_API_U;

  // function deleteAttraction(id) {
  //   if (window.confirm("Delete this post?")) {
  //     axios
  //       .delete(`${baseURL}/posts/${id}`)
  //       .then((response) => {
  //         if (response.status === 204) {
  //           setFlashMessage("deleted");
  //           setTimeout(() => {
  //             window.location.reload();
  //           }, 3000);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "We are having a problem accessing the posts API: " + error
  //         );
  //       });
  //   }
  // }
  return (
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
          <div className="attration-section__icons">
            <Link
              to={`/travel-notes/${postId}/attractions/edit/${attraction.id}/`}
            >
              <img
                className="attration-section__edit-icon"
                src={editIcon}
                alt="edit icon"
              />
            </Link>
            <img
              // onClick={() => {
              //   deleteAttraction(post.id);
              // }}
              className="attration-section__delete-icon"
              src={deleteIcon}
              alt="delete icon"
            />
          </div>
        </div>
      </div>
      <img
        className="attration-section__image"
        src={attraction.image_path}
        alt={attraction.name}
      />
    </article>
  );
}

export default Attraction;
