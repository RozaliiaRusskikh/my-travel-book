import "./CountryFactsPage.scss";
import FindCountryForm from "../../components/FindCountryForm/FindCountryForm";
import { useState, useEffect } from "react";

function CountryFactsPage() {
  const [countryFacts, setCountryFacts] = useState(null);

  const getFacts = (facts) => {
    setCountryFacts(facts);
  };

  document.title = "Country Facts";

  return (
    <section className="country-facts-section">
      <FindCountryForm getFacts={getFacts} />
      <h1 className="country-facts-section__title">Quick Facts</h1>
    </section>
  );
}

export default CountryFactsPage;
