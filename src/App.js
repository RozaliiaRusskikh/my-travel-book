import "./App.scss";
import UserContext from "./context/userContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import { lazy, Suspense } from "react";
import firebase from "./firebase";
import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const auth = getAuth(firebase); //Firebase auth

  const TravelNotesPage = lazy(() =>
    import("./pages/TravelNotesPage/TravelNotesPage")
  );

  const Home = lazy(() => import("./pages/Home/Home"));

  const Footer = lazy(() => import("./components/Footer/Footer"));

  const TripDetailsPage = lazy(() =>
    import("./pages/TripDetailsPage/TripDetailsPage")
  );
  const CountryFactsPage = lazy(() =>
    import("./pages/CountryFactsPage/CountryFactsPage")
  );
  const NoteAddForm = lazy(() => import("./pages/NoteAddForm/NoteAddForm"));
  const AttractionAddForm = lazy(() =>
    import("./pages/AttractionAddForm/AttractionAddForm")
  );
  const NoteEditForm = lazy(() => import("./pages/NoteEditForm/NoteEditForm"));
  const NoPage = lazy(() => import("./pages/NoPage/NoPage"));
  const AttractionEditForm = lazy(() =>
    import("./pages/AttractionEditForm/AttractionEditForm")
  );
  const Login = lazy(() => import("./pages/Login/Login"));

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
        setError(false);
      })
      .catch((error) => {
        setError(true);
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
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/travel-notes" element={<TravelNotesPage />} />
              <Route
                path="/travel-notes/new"
                element={
                  user.isAuthenticated ? (
                    <NoteAddForm />
                  ) : (
                    <NoPage text={" Login to add a note."} link={"LOGIN"} />
                  )
                }
              />
              <Route
                path="/travel-notes/edit/:postId"
                element={
                  user.isAuthenticated ? (
                    <NoteEditForm />
                  ) : (
                    <NoPage text={" Login to edit a note."} link={"LOGIN"} />
                  )
                }
              />
              <Route
                path="/travel-notes/:postId"
                element={<TripDetailsPage />}
              />
              <Route
                path="/travel-notes/:postId/attractions/new"
                element={
                  user.isAuthenticated ? (
                    <AttractionAddForm />
                  ) : (
                    <NoPage
                      text={" Login to add an attraction."}
                      link={"LOGIN"}
                    />
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
                      text={" Login to edit an attraction."}
                      link={"LOGIN"}
                    />
                  )
                }
              />
              <Route path="/country-facts" element={<CountryFactsPage />} />
              <Route
                path="/login"
                element={
                  !user.isAuthenticated ? (
                    <Login error={error} />
                  ) : (
                    <Navigate replace to="/" />
                  )
                }
              />
              <Route
                path="*"
                element={
                  <NoPage
                    text=" Sorry! You have landed on a page that doesn't exist."
                    link="HOME"
                  />
                }
              />
            </Routes>
            <Footer />
          </Suspense>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
