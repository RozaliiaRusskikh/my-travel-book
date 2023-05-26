import "./NotesHero.scss";
import backButton from "../../assets/icons/back-button.svg";
import { useNavigate } from "react-router-dom";
import "lazysizes";

function NotesHero({ image, text, isBackShown, imageFallBack }) {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/travel-notes");
  };

  return (
    <section className="notes-hero">
      <picture>
        <source srcset={image} type="image/webp" />
        <img
          className="notes-hero__image lazyload"
          data-sizes="auto"
          data-src={imageFallBack}
          alt="hero"
        />
      </picture>
      {isBackShown && (
        <img
          onClick={handleIconClick}
          className="notes-hero__back"
          src={backButton}
          alt="back button"
        />
      )}
      <p className="notes-hero__text">{text}</p>
    </section>
  );
}

export default NotesHero;
