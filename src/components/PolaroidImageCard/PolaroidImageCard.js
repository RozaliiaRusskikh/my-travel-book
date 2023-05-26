import "./PolaroidImageCard.scss";
import 'lazysizes';

function PolaroidImageCard({ image, title, quote }) {
  return (
    <div className="polaroid-flip-card">
      <div className="polaroid-flip-card__inner">
        <div className="polaroid-flip-card__front">
          <img className="polaroid-flip-card__image lazyload" data-src={image} data-sizes="auto" alt={title} />
          <div className="polaroid-flip-card__container">
            <p className="polaroid-flip-card__title">{title}</p>
          </div>
        </div>
        <div className="polaroid-flip-card__back">
          <p className="polaroid-flip-card__quote">{quote}</p>
        </div>
      </div>
    </div>
  );
}
export default PolaroidImageCard;
