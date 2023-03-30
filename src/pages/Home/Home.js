import "./Home.scss";
import Hero from "../../components/Hero/Hero";
import Map from "../../components/Map/Map";

function Home() {
  document.title = "My Travel Book";
  return (
    <section>
      <Hero />
      <Map />
    </section>
  );
}

export default Home;
