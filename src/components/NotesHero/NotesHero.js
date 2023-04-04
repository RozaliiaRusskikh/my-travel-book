import "./NotesHero.scss";

function NotesHero({ image, text }) {
  return (
    <section className="notes-hero">
      <img className="notes-hero__image" src={image} alt="hero" />
      <p className="notes-hero__text">{text}</p>
    </section>
  );
}

export default NotesHero;
