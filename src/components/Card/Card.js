import "./Card.scss";

function Card({ post }) {
  return (
    <article className="post-card">
      <img className="post-card__image" src={post.image_path} alt={post.name} />
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
