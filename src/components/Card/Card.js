import "./Card.scss";
import 'lazysizes';

function Card({ post }) {

  return (
    <article className="post-card">
      <img className="post-card__image lazyload" data-src={post.image_path} data-sizes="auto" alt={post.name} />
      <div className="post-card__container">
        <p className="post-card__year">
          <strong>{post.country},</strong>
        </p>
        <p className="post-card__name">{post.year}</p>
      </div>
    </article>
  );
}

export default Card;
