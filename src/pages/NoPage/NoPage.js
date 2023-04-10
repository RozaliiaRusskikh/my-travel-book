import "./NoPage.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

function NoPage({ text, link }) {
  return (
    <section className="not-found-page">
      <div className="not-found-page__container">
        <p className="not-found-page__text">
          <FontAwesomeIcon icon={faWarning} color={"#ff8a65"} />
          {text}
        </p>
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
