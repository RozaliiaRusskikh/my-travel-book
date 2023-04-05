import "./CountryFact.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CountryFact({ label, content, icon }) {
  return (
    <div className="country-fact">
      <FontAwesomeIcon
        className="country-fact__icon"
        icon={icon}
        color={"#ff8a65"}
      />
      <p className="country-fact__label">{label}</p>
      <p className="country-fact__content">{content}</p>
    </div>
  );
}

export default CountryFact;
