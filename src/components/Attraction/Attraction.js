import "./Attraction.scss";

function Attraction({ attraction }) {
  return (
    <section className="attration-section">
      <h3>{attraction.name}</h3>
      <p>{attraction.description}</p>
      <img src={attraction.image_path} alt={attraction.name}/> 
    </section>
  );
}

export default Attraction;