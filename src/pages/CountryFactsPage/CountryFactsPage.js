import "./CountryFactsPage.scss";
import { useState } from "react";
import FindCountryForm from "../../components/FindCountryForm/FindCountryForm";
import CountryFact from "../../components/CountryFact/CountryFact";
import PolaroidImageCard from "../../components/PolaroidImageCard/PolaroidImageCard";
import lake from "../../assets/images/lake.jpg";
import waterfall from "../../assets/images/waterfall.jpg";
import camels from "../../assets/images/camels.jpg";
import kulSharif from "../../assets/images/kul-sharif.jpg";
import {
  faLanguage,
  faMoneyBill,
  faCity,
  faMap,
  faPeopleArrows,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";

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
          <div className="country-facts-section__table">
            <div className="country-facts-section__left">
              <CountryFact
                label="Language:"
                content={
                  countryFacts.languages[Object.keys(countryFacts.languages)[0]]
                }
                icon={faLanguage}
              />
              <CountryFact
                label="Currency:"
                content={[
                  countryFacts.currencies[
                    Object.keys(countryFacts.currencies)[0]
                  ].name,
                  ", ",
                  countryFacts.currencies[
                    Object.keys(countryFacts.currencies)[0]
                  ].symbol,
                ]}
                icon={faMoneyBill}
              />
              <CountryFact
                label="Capital:"
                content={countryFacts.capital[0]}
                icon={faCity}
              />
            </div>
            <div className="country-facts-section__right">
              <CountryFact
                label="Continent:"
                content={countryFacts.continents[0]}
                icon={faMap}
              />
              <CountryFact
                label="Population:"
                content={countryFacts.population}
                icon={faPeopleArrows}
              />
              <CountryFact
                label="Flag:"
                content={countryFacts.flag}
                icon={faFlag}
              />
            </div>
          </div>
          <a
            className="country-facts-section__map"
            href={countryFacts.maps.googleMaps}
            target="_blank"
            rel="noreferrer"
          >
            View on Map
          </a>
        </section>
      )}
      <h1 className="country-facts-section__title">
        Flippable Photo Gallery Cards
      </h1>
      <div className="country-facts-section__polaroid-cards">
        <PolaroidImageCard image={lake} title="Lake Louise, Canada" />
        <PolaroidImageCard image={waterfall} title="Niagara Falls, Canada" />
        <PolaroidImageCard
          image={kulSharif}
          title="Kul Sharif Mosque in Kazan, Russia"
        />
        <PolaroidImageCard image={camels} title="Bedouin people, Jordan" />
      </div>
    </section>
  );
}

export default CountryFactsPage;
