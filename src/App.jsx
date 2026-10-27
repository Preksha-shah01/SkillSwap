import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Community from "./pages/Community.jsx";
import DefaultPage from "./pages/DefaultPage.jsx";
import { PAGES } from "./data.js";

export default function App() {
  const [page, setPage] = useState("community");
  const [query, setQuery] = useState("");

  return (
    <div className="app">
      <Sidebar page={page} onNavigate={setPage} />
      <div className="main">
        <Header label={PAGES[page].label} onNavigate={setPage} query={query} setQuery={setQuery} />
        {page === "community" ? (
          <Community query={query} setQuery={setQuery} />
        ) : (
          <DefaultPage page={PAGES[page]} />
        )}
      </div>
    </div>
  );
}
