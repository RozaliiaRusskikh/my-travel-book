import "./TripDetailsPage.scss";
import NotesHero from "../../components/NotesHero/NotesHero";
import Attraction from "../../components/Attraction/Attraction";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../utils/api-utils";

function TripDetailsPage() {
  const [post, setPost] = useState(null);
  const [attractions, setAttractions] = useState(null);
  const baseURL = "http://localhost:8080";
  const { postId } = useParams();

  useEffect(() => {
    getData(`${baseURL}/posts/${postId}`, setPost);
  }, [postId]);

  useEffect(() => {
    getData(`${baseURL}/posts/${postId}/attractions`, setAttractions);
  }, [postId]);

  if (!post || !attractions) {
    return <h3 className="loading">Loading...</h3>;
  }

  document.title = post.name;

  return (
    <section className="trip-section">
      <NotesHero
        image={post.image_path}
        text={post.country + " " + post.year}
      />
      <h1 className="trip-section__title">{post.title}</h1>
      <p className="trip-section__trip-description"> {post.description}</p>
      <h2 className="trip-section__attraction-heading">Tourist Attractions</h2>
      {attractions.map((attraction) => {
        return (
          <li key={attraction.id}>
            <Attraction attraction={attraction} />
          </li>
        );
      })}
    </section>
  );
}

export default TripDetailsPage;
