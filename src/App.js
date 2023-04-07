import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import TravelNotesPage from "./pages/TravelNotesPage/TravelNotesPage";
import TripDetailsPage from "./pages/TripDetailsPage/TripDetailsPage";
import CountryFactsPage from "./pages/CountryFactsPage/CountryFactsPage";
import NoteForm from "./components/NoteForm/NoteForm";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/travel-notes" element={<TravelNotesPage />} />
          <Route path="/travel-notes/new" element={<NoteForm />} />
          <Route path="/travel-notes/:postId" element={<TripDetailsPage />} />
          <Route path="/country-facts" element={<CountryFactsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
