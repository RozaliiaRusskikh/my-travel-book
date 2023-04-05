import "./CountryFactsPage.scss";
import { useState } from "react";
import FindCountryForm from "../../components/FindCountryForm/FindCountryForm";
import CountryFact from "../../components/CountryFact/CountryFact";

function CountryFactsPage() {
  const [countryFacts, setCountryFacts] = useState(null);

  const getFacts = (facts) => {
    setCountryFacts(facts);
  };

  document.title = "Country Facts";
  return (
    <section className="country-facts-section">
      <FindCountryForm getFacts={getFacts} />
      {countryFacts && (
        <section className="country-facts-section__quick-facts-section">
          <h1 className="country-facts-section__title">Quick Facts</h1>
          <CountryFact countryFacts={countryFacts} />
        </section>
      )}
    </section>
  );
}

export default CountryFactsPage;
