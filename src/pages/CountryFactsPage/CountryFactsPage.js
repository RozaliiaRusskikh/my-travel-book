import "./CountryFactsPage.scss";
import { useState } from "react";
import FindCountryForm from "../../components/FindCountryForm/FindCountryForm";
import CountryFact from "../../components/CountryFact/CountryFact";
import PolaroidImageCard from "../../components/PolaroidImageCard/PolaroidImageCard";
import lake from "../../assets/images/lake.jpg";
import waterfall from "../../assets/images/waterfall.jpg";
import camels from "../../assets/images/camels.jpg";
import squamish from "../../assets/images/squamish.jpg";
import volcano from "../../assets/images/volcano.jpg";
import kulSharif from "../../assets/images/kul-sharif.jpg";
import lakeWebp from "../../assets/images/lake.webp";
import waterfallWebp from "../../assets/images/waterfall.webp";
import camelsWebp from "../../assets/images/camels.webp";
import squamishWebp from "../../assets/images/squamish.webp";
import volcanoWebp from "../../assets/images/volcano.webp";
import kulSharifWebp from "../../assets/images/kul-sharif.webp";
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
        Image Cards with Travel Quotes To Inspire Wanderlust
      </h1>
      <p className="country-facts-section__cards-description">
        If you’re looking for inspiration to fuel your wanderlust, you’re
        certain to find the perfect quotation below! Just flip a card.
      </p>
      <div className="country-facts-section__polaroid-cards">
        <PolaroidImageCard
          image={lake}
          optimizedImage={lakeWebp}
          title="Lake Louise, Canada"
          quote='"To travel is to discover that everyone is wrong about other countries." – Aldous Huxley'
        />
        <PolaroidImageCard
          image={waterfall}
          optimizedImage={waterfallWebp}
          title="Niagara Falls, Canada"
          quote='"The world is a book and those who do not travel read only one page." - Saint Augustine'
        />
        <PolaroidImageCard
          optimizedImage={kulSharifWebp}
          image={kulSharif}
          title="Kul Sharif Mosque in Kazan, Russia"
          quote='"Traveling – it leaves you speechless, then turns you into a storyteller." – Ibn Battuta
            '
        />
        <PolaroidImageCard
          optimizedImage={camelsWebp}
          image={camels}
          title="Bedouin people, Jordan"
          quote='"Better to see something once than hear about it a thousand times." – Asian Proverb'
        />
        <PolaroidImageCard
          optimizedImage={squamishWebp}
          image={squamish}
          title="Sea to Sky Gondola in Squamish, Canada"
          quote='"If you think adventure is dangerous, try routine, it is lethal." - Paulo Coelho'
        />
        <PolaroidImageCard
          optimizedImage={volcanoWebp}
          image={volcano}
          title="Poás Volcano, Costa Rica"
          quote='"Live your life by a compass, not a clock."– Erica Jong'
        />
      </div>
    </section>
  );
}

export default CountryFactsPage;
