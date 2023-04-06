import "./PolaroidImageCard.scss";

function PolaroidImageCard({ image, title }) {
  return (
    <div className="polaroid">
      <img className="polaroid__image" src={image} alt={title} />
      <div className="polaroid__container">
        <p className="polaroid__title">{title}</p>
      </div>
    </div>
  );
}
export default PolaroidImageCard;
