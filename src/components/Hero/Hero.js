import "./Hero.scss";
import Button from "../Button/Button";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__image">
        <div className="hero__content">
          <p className="hero__question">
            Want to get information about a specific country?
          </p>
          <Button text="Start Exploring" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
