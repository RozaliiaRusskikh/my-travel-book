import "./TripDetailsPage.scss";
import NotesHero from "../../components/NotesHero/NotesHero";
import Attraction from "../../components/Attraction/Attraction";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../utils/api-utils";

function TripDetailsPage() {
  const [post, setPost] = useState(null);
  const [attractions, setAttractions] = useState(null);
  const baseURL = process.env.REACT_APP_API_URL;
  const { postId } = useParams();

  useEffect(() => {
    getData(`${baseURL}/posts/${postId}`, setPost);
  }, [baseURL, postId]);

  useEffect(() => {
    getData(`${baseURL}/posts/${postId}/attractions`, setAttractions);
  }, [baseURL, postId]);

  if (!post) {
    return <h3 className="loading">Loading...</h3>;
  }

  document.title = post.name;

  return (
    <section className="trip-section">
      <NotesHero
        image={post.image_path}
        text={post.country + " " + post.year}
        isBackShown={true}
      />
      <h1 className="trip-section__title">{post.title}</h1>
      <p className="trip-section__trip-description"> {post.description}</p>
      {attractions && (
        <h2 className="trip-section__attraction-heading">
          Tourist Attractions:
        </h2>
      )}
      {attractions &&
        attractions.map((attraction, index) => {
          return (
            <li key={attraction.id}>
              <Attraction attraction={attraction} index={index} />
            </li>
          );
        })}
    </section>
  );
}

export default TripDetailsPage;
