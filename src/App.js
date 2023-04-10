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
import AttractionEditForm from "./pages/AttractionEditForm/AttractionEditForm";
import Login from "./pages/Login/Login";
import firebase from "./firebase";
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth(firebase); //Firebase auth

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

  return (
    <div className="app">
      <BrowserRouter>
        <UserContext.Provider value={{ user, onLogin }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                !user.isAuthenticated ? <Login /> : <Navigate replace to="/" />
              }
            />
            <Route path="/travel-notes" element={<TravelNotesPage />} />
            <Route path="/travel-notes/new" element={<NoteAddForm />} /> 
            <Route
              path="/travel-notes/edit/:postId"
              element={<NoteEditForm />}
            />
            <Route path="/travel-notes/:postId" element={<TripDetailsPage />} />
            <Route
              path="/travel-notes/:postId/attractions/new"
              element={<AttractionAddForm />}
            />
            <Route
              path="/travel-notes/:postId/attractions/edit/:attractionId"
              element={<AttractionEditForm />}
            />
            <Route path="/country-facts" element={<CountryFactsPage />} />
          </Routes>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
