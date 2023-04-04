import "./TravelNotesPage.scss";
import NotesHero from "../../components/NotesHero/NotesHero";
import notesHero from "../../assets/images/memory5.jpg";

function TravelNotesPage() {
  return (
    <section className="notes">
      <NotesHero image={notesHero} text="My Wander Memories" />
    </section>
  );
}

export default TravelNotesPage;
