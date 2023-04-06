import "./TravelNotesPage.scss";
import NotesHero from "../../components/NotesHero/NotesHero";
import Card from "../../components/Card/Card";
import notesHero from "../../assets/images/memory5.jpg";
import { Link } from "react-router-dom";
import { getData } from "../../utils/api-utils";
import { useState, useEffect } from "react";

function TravelNotesPage() {
  document.title = "My Travel Notes";
  const [posts, setPosts] = useState("");
  const baseURL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getData(`${baseURL}/posts`, setPosts);
  }, [baseURL]);

  if (!posts) {
    return <h3 className="loading">Loading...</h3>;
  }

  return (
    <section className="notes">
      <NotesHero
        image={notesHero}
        text="My Wander Memories"
        isBackShown={false}
      />
      <div className="notes__intro-container">
        <p className="notes__intro">
          Welcome to my <strong>Travel Notes page</strong>! Here, you'll find a
          collection of my favourite adventures and experiences from all around
          the world. I am thrilled to share my stories with you.
        </p>
        <p className="notes__intro">
          Through my travel posts, I hope to inspire you to explore new
          destinations and embark on your own adventures. So, come along with me
          on this journey and let's explore the world together!
        </p>
      </div>
      <div className="notes__cards">
        {posts.map((post) => {
          return (
            <Link key={post.id} to={`/travel-notes/${post.id}`}>
              <Card post={post} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default TravelNotesPage;
