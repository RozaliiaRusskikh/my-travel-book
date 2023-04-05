import "./CountryFact.scss";
import placeholder from "../../assets/icons/search.svg"

function CountryFact() {
  return (
    <atricle className="country-fact">
      <img className="country-fact_icon" alt="icon" src={placeholder} />
      <p className="country-fact__label"></p>
      <p className="country-fact__content"></p>
    </atricle>
  );
}

export default CountryFact;
