import "./Hero.scss";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const navigateToCountryPage = () => {
    navigate("/country-facts");
  };

  return (
    <section className="hero">
      <div className="hero__image">
        <div className="hero__content">
          <p className="hero__question">
            Want to get information about a specific country?
          </p>
          <Button onClick={navigateToCountryPage} text="Start Exploring" isDisabled={false}/>
        </div>
      </div>
    </section>
  );
}

export default Hero;
