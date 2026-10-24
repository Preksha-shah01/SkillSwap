
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SwapWorkspace from "./pages/SwapWorkspace";
import KnowledgeHub from "./pages/KnowledgeHub";
import UploadNotes from "./pages/UploadNotes";
import NoteDetails from "./pages/NoteDetails";
import SkillExchange from "./pages/SkillExchange";

function ComingSoon({ title }) {
  return (
    <div
      style={{
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>{title}</h1>
      <p>This page will be added soon.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* KNOWLEDGE HUB */}
        <Route
          path="/"
          element={<KnowledgeHub />}
        />
         <Route
  path="/swap-workspace"
  element={<SwapWorkspace />}
/>
        {/* UPLOAD NOTES */}
        <Route
          path="/upload"
          element={<UploadNotes />}
        />

        {/* NOTE DETAILS */}
        <Route
          path="/note/:id"
          element={<NoteDetails />}
        />

        {/* SKILL EXCHANGE */}
        <Route
          path="/skill-exchange"
          element={<SkillExchange />}
        />

        {/* FUTURE PAGES */}
        <Route
          path="/overview"
          element={<ComingSoon title="Overview" />}
        />

        <Route
          path="/profile"
          element={<ComingSoon title="Profile & Skills" />}
        />

        <Route
          path="/wallet"
          element={<ComingSoon title="Wallet" />}
        />

        <Route
          path="/community"
          element={<ComingSoon title="Community" />}
        />

        <Route
          path="/leaderboard"
          element={<ComingSoon title="Leaderboard" />}
        />

        <Route
          path="/messages"
          element={<ComingSoon title="Messages" />}
        />

        <Route
          path="/ratings"
          element={<ComingSoon title="Ratings & Reviews" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
