import { BrowserRouter, Routes, Route } from "react-router-dom";
import KnowledgeHub from "./pages/KnowledgeHub";
import UploadNotes from "./pages/UploadNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<KnowledgeHub />} />

        <Route path="/upload" element={<UploadNotes />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;