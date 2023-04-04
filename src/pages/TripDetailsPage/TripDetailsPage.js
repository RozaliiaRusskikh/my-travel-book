import "./TripDetailsPage.scss";
import NotesHero from "../../components/NotesHero/NotesHero";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../utils/api-utils";

function TripDetailsPage() {
  const [post, setPost] = useState(null);
  const baseURL = "http://localhost:8080";
  const { postId } = useParams();
  console.log(postId);

  useEffect(() => {
    getData(`${baseURL}/posts/${postId}`, setPost);
  }, [postId]);

  if (!post) {
    return <h3 className="loading">Loading...</h3>;
  }

  document.title = post.title;

  return (
    <section className="trip-section">
      <NotesHero image={post.image_path} text={post.title} />
    </section>
  );
}

export default TripDetailsPage;
