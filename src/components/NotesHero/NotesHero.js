import "./NotesHero.scss";
import backButton from "../../assets/icons/back-button.svg";
import { useNavigate } from "react-router-dom";
import "lazysizes";

function NotesHero({
  image,
  text,
  isBackShown,
  imageFallBack,
  imageMobile,
  imageMobileWebp,
}) {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/travel-notes");
  };

  return (
    <section className="notes-hero">
      <picture>
        <source media="(min-width: 200px)" srcset={image} type="image/webp" />
        <source
          media="(max-width: 500px)"
          srcset={imageMobileWebp}
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcset={imageFallBack}
          type="image/jpg"
        />
        <source
          media="(max-width: 500px)"
          srcset={imageMobile}
          type="image/jpg"
        />
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
