import "./CountryFact.scss";
import placeholder from "../../assets/icons/search.svg";

function CountryFact({ countryFacts }) {
  return (
    <atricle className="country-fact">
      <img className="country-fact_icon" alt="icon" src={placeholder} />
      <p className="country-fact__label">Language</p>
      <p className="country-fact__content">Japanese</p>
    </atricle>
  );
}

export default CountryFact;
