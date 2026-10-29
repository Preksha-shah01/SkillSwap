
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SkillExchange from "./pages/SkillExchange";
import SwapWorkspace from "./pages/SwapWorkspace";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfileSkills from "./pages/ProfileSkills";
import ProtectedRoute from "./components/ProtectedRoute";

import KnowledgeHub from "./pages/KnowledgeHub";
import UploadNotes from "./pages/UploadNotes";
import NoteDetails from "./pages/NoteDetails";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile-skills"
          element={<ProfileSkills />}
        />

        <Route
          path="/knowledge-hub"
          element={<KnowledgeHub />}
        />

        <Route
          path="/upload"
          element={<UploadNotes />}
        />

        <Route
          path="/note/:id"
          element={<NoteDetails />}
        />

        <Route
          path="/swap-workspace"
          element={<SwapWorkspace />}
        />
      </Route>

      {/* Skill Exchange - existing route preserved */}
      <Route
        path="/skill-exchange"
        element={<SkillExchange />}
      />

      {/* Fallback route */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}
