import "./NoPage.scss";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <section className="not-found-page">
      <div className="not-found-page__container">
        <p className="not-found-page__text">
          Sorry! You have landed on a page that doesn't exist.
        </p>
        <Link className="not-found-page__link" to="/">
          Please go to the <strong>Home</strong> page
        </Link>
      </div>
    </section>
  );
}

export default NoPage;
