import "./TravelNotesPage.scss";
import NotesHero from "../../components/NotesHero/NotesHero";
import Message from "../../components/Message/Message";
import Card from "../../components/Card/Card";
import notesHero from "../../assets/images/memory5.jpg";
import notesHeroMobile from "../../assets/images/memory5Mobile.jpg";
import notesHeroWebp from "../../assets/images/memory5.webp";
import { Link } from "react-router-dom";
import { getData } from "../../utils/api-utils";
import { useState, useEffect } from "react";
import AddButton from "../../components/AddButton/AddButton";
import deleteIcon from "../../assets/icons/icon-delete.svg";
import editIcon from "../../assets/icons/pencil.svg";
import axios from "axios";
import UserContext from "../../context/userContext";
import { useContext } from "react";

function TravelNotesPage() {
  document.title = "My Travel Notes";
  const [posts, setPosts] = useState("");
  const [message, setMessage] = useState(null);
  const baseURL = process.env.REACT_APP_API_URL;
  const { user } = useContext(UserContext);

  useEffect(() => {
    getData(`${baseURL}/posts`, setPosts);
  }, [baseURL]);

  if (!posts) {
    return <h3 className="loading">Loading...</h3>;
  }

  function setFlashMessage(message) {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }

  function deletePost(id) {
    if (window.confirm("Delete this note?")) {
      axios
        .delete(`${baseURL}/posts/${id}`)
        .then((response) => {
          if (response.status === 204) {
            setFlashMessage("deleted");
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        })
        .catch((error) => {
          console.error(
            "We are having a problem accessing the posts API: " + error
          );
        });
    }
  }

  return (
    <section className="notes">
      <NotesHero
        image={notesHeroWebp}
        imageFallBack={notesHero}
        imageMobile={notesHeroMobile}
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
        <p className="notes__intro notes__intro--quote">
          “The world is too big to stay in one place and life is too short to do
          just one thing."
        </p>
      </div>
      <div className="notes__cards">
        {posts.map((post) => {
          return (
            <div key={post.id} className="notes__link">
              <Link to={`/travel-notes/${post.id}`}>
                <Card post={post} />
              </Link>
              {user.isAuthenticated && (
                <div className="notes__icons">
                  <Link to={`/travel-notes/edit/${post.id}`}>
                    <img
                      className="notes__edit-icon"
                      src={editIcon}
                      alt="edit icon"
                    />
                  </Link>
                  <img
                    onClick={() => {
                      deletePost(post.id);
                    }}
                    className="notes__delete-icon"
                    src={deleteIcon}
                    alt="delete icon"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {message && <Message message={message} />}
      {user.isAuthenticated && <AddButton path={"/travel-notes/new"} />}
    </section>
  );
}

export default TravelNotesPage;
