import "./NoPage.scss";
import { Link } from "react-router-dom";

function NoPage({ text, link }) {
  return (
    <section className="not-found-page">
      <div className="not-found-page__container">
        <p className="not-found-page__text">{text}</p>
        <Link
          className="not-found-page__link"
          to={link === "HOME" ? "/" : "/login"}
        >
          Please go to the <strong>{link}</strong> page
        </Link>
      </div>
    </section>
  );
}

export default NoPage;
