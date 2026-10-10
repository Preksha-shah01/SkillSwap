import { BrowserRouter, Routes, Route } from "react-router-dom";
import KnowledgeHub from "./pages/KnowledgeHub";
import UploadNotes from "./pages/UploadNotes";
import NoteDetails from "./pages/NoteDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<KnowledgeHub />} />
        <Route path="/upload" element={<UploadNotes />} />
        <Route path="/note/:id" element={<NoteDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
