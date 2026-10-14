# SkillSwap Leaderboard

A responsive React and Vite leaderboard demo for one university campus. It includes Daily, Weekly, Monthly, and Overall sample rankings, live name search, score sorting, recalculated positions, podium highlights, and a no-results state. All sample data is local to the app; no database or API is needed.

## Run locally

1. Install [Node.js](https://nodejs.org/) (npm is included).
2. Open this folder in VS Code.
3. In the VS Code terminal, run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite, usually `http://localhost:5173/`.

To create a production build, run `npm run build`. To preview that build, run `npm run preview`.

## Project structure

- `src/App.jsx` — leaderboard UI, sample data, filtering and ranking state.
- `src/styles.css` — responsive dark theme and layouts.
- `src/main.jsx` — React entry point.
- `index.html` — Vite page shell.

The Google Fonts import is optional; system fallbacks remain available when offline.
