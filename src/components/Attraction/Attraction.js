import "./Attraction.scss";

function Attraction({ attraction, index }) {
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
        <p className="attration-section__description">
          {attraction.description}
        </p>
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
