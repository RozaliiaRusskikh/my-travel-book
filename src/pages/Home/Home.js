import "./Home.scss";
import Hero from "../../components/Hero/Hero";

function Home() {
  document.title = "My Travel Book";
  return (
    <section>
      <Hero />
    </section>
  );
}

export default Home;
