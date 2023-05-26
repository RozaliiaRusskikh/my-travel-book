import "./NotesHero.scss";
import backButton from "../../assets/icons/back-button.svg";
import { useNavigate } from "react-router-dom";
import 'lazysizes';

function NotesHero({ image, text, isBackShown }) {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/travel-notes");
  };

  return (
    <section className="notes-hero">
      <img
        className="notes-hero__image lazyload"
        data-sizes="auto"
        data-src={image}
        alt="hero"
      />
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
