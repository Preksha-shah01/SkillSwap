# SkillSwap Admin Dashboard

A responsive React-only frontend for screen 16, “Admin Dashboard”. It uses realistic sample data and local React state. There is no backend, database, or API.

## Start a new project or use an existing one?

This folder is a complete, standalone Vite + React project, so create/use it as a **new project**. If you already have a React app, you can instead copy `src/App.jsx` and `src/App.css` into it and install `lucide-react`.

## Run locally

Install Node.js (version 18 or newer), unzip the project, then open a terminal in the `skillswap-admin-dashboard` folder and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually <http://localhost:5173>).

To create a production build and preview it locally:

```bash
npm run build
npm run preview
```

## Files

- `index.html` — Vite page shell
- `vite.config.js` — React JSX and Fast Refresh configuration
- `src/main.jsx` — React entry point
- `src/App.jsx` — Admin Dashboard component, sample data, and interactions
- `src/App.css` — responsive dashboard styles
- `package.json` — scripts and dependencies

Approving or rejecting a note removes it from the pending list and updates the pending count for the current session. “View All Reports” expands the report categories. Changes are stored in browser memory and reset when the page is reloaded.
