import "./App.scss";
import UserContext from "./context/userContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import TravelNotesPage from "./pages/TravelNotesPage/TravelNotesPage";
import TripDetailsPage from "./pages/TripDetailsPage/TripDetailsPage";
import CountryFactsPage from "./pages/CountryFactsPage/CountryFactsPage";
import NoteAddForm from "./pages/NoteAddForm/NoteAddForm";
import AttractionAddForm from "./pages/AttractionAddForm/AttractionAddForm";
import NoteEditForm from "./pages/NoteEditForm/NoteEditForm";
import NoPage from "./pages/NoPage/NoPage";
import AttractionEditForm from "./pages/AttractionEditForm/AttractionEditForm";
import Login from "./pages/Login/Login";
import firebase from "./firebase";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth(firebase); //Firebase auth

  useEffect(() => {
    const data = sessionStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const onLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser({
          email: response.user["email"],
          isAuthenticated: true,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        setUser({ isAuthenticated: false });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="app">
      <BrowserRouter>
        <UserContext.Provider value={{ user, onLogin, onLogout }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/travel-notes" element={<TravelNotesPage />} />
            <Route
              path="/travel-notes/new"
              element={
                user.isAuthenticated ? (
                  <NoteAddForm />
                ) : (
                  <NoPage text={"Login to add a note."} link={"LOGIN"} />
                )
              }
            />
            <Route
              path="/travel-notes/edit/:postId"
              element={
                user.isAuthenticated ? (
                  <NoteEditForm />
                ) : (
                  <NoPage text={"Login to edit a note."} link={"LOGIN"} />
                )
              }
            />
            <Route path="/travel-notes/:postId" element={<TripDetailsPage />} />
            <Route
              path="/travel-notes/:postId/attractions/new"
              element={
                user.isAuthenticated ? (
                  <AttractionAddForm />
                ) : (
                  <NoPage text={"Login to add an attraction."} link={"LOGIN"} />
                )
              }
            />
            <Route
              path="/travel-notes/:postId/attractions/edit/:attractionId"
              element={
                user.isAuthenticated ? (
                  <AttractionEditForm />
                ) : (
                  <NoPage
                    text={"Login to edit an attraction."}
                    link={"LOGIN"}
                  />
                )
              }
            />
            <Route path="/country-facts" element={<CountryFactsPage />} />
            <Route
              path="/login"
              element={
                !user.isAuthenticated ? <Login /> : <Navigate replace to="/" />
              }
            />
            <Route
              path="*"
              element={
                <NoPage
                  text="Sorry! You have landed on a page that doesn't exist."
                  link="HOME"
                />
              }
            />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
