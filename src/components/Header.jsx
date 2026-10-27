import { useEffect, useRef, useState } from "react";
import { MENU } from "../data.js";

export default function Header({ label, onNavigate, query, setQuery }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close the dropdown on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (id) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header className="top">
      <div className="crumb">
        Workspace <span>/</span> <b>{label}</b>
      </div>
      <div className="tools" ref={ref}>
        <label className="search">
          <span aria-hidden="true">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, tags…"
            aria-label="Search"
          />
        </label>
        <button
          className="me"
          onClick={() => setOpen(!open)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="Open profile menu"
        >
          AK
        </button>
        {open && (
          <div className="menu" role="menu">
            <div className="mh">
              <span className="me">AK</span>
              <div>
                <b>Aisha K.</b>
                <small>GSFC University</small>
              </div>
            </div>
            {MENU.map((m) => (
              <button key={m.id} role="menuitem" onClick={() => go(m.id)}>
                <span className="ic" aria-hidden="true">{m.icon}</span>
                {m.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
