import "./Attraction.scss";

function Attraction({ attraction }) {
  return (
    <section className="attration-section">
      <h3 className="attration-section__heading">{attraction.name}</h3>
      <img
        className="attration-section__image"
        src={attraction.image_path}
        alt={attraction.name}
      />
      <p className="attration-section__description">{attraction.description}</p>
    </section>
  );
}

export default Attraction;
