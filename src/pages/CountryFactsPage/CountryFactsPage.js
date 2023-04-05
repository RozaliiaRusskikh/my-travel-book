import "./CountryFactsPage.scss";
import FindCountryForm from "../../components/FindCountryForm/FindCountryForm";

function CountryFactsPage() {
  document.title = "Country Facts";

  return (
    <section className="country-facts-section">
      <FindCountryForm />
    </section>
  );
}

export default CountryFactsPage;
