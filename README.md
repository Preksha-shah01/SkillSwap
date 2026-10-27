# SkillSwap – Community

A React + Vite front end for the SkillSwap campus skill-exchange app. It has the dark purple workspace layout (sidebar, top bar, profile menu), a working **Community feed**, and default pages for every other sidebar tab so you can fill them in yourself.

## Quick start

Requires Node.js 18 or newer.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## What works

- **Sidebar:** every tab opens its own page; the active tab and the breadcrumb update. Badges (Skill Exchange 2, Messages 3) are set in `src/data.js`.
- **AK profile menu:** click AK (top right) to open a dropdown with View profile, Wallet, Ratings & Reviews and Settings. It closes on outside click or Escape.
- **Community feed:** category tabs, sort by Latest or Most liked, like toggle, publish a new post, and search (top bar or clicking a trending topic).
- **Default pages:** Overview, Profile & Skills, Skill Exchange, Knowledge Hub, Wallet, Leaderboard, Messages, Ratings & Reviews and Settings each show a title, description and stat cards.

Posts and likes live in React state only, so they reset on refresh. There is no backend yet.

## Project structure

```
skillswap-community/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── logo.png              # SkillSwap logo (also the favicon)
└── src/
    ├── main.jsx              # entry point
    ├── App.jsx               # layout + which page is shown
    ├── index.css             # global styles, sidebar, header, default pages
    ├── data.js               # sidebar items, profile menu, default page content
    ├── components/
    │   ├── Sidebar.jsx
    │   └── Header.jsx        # breadcrumb, search, AK dropdown
    └── pages/
        ├── Community.jsx     # feed page
        ├── Community.css
        └── DefaultPage.jsx   # placeholder used by every other tab
```

## Customising

**Replace a default page.** Create `src/pages/Wallet.jsx`, then in `src/App.jsx` render it when `page === "wallet"`, the same way `Community` is rendered.

**Add a new sidebar tab.** Add an item to `NAV_MAIN` or `NAV_SPACE` and an entry to `PAGES` in `src/data.js`.

**Change the sample posts.** Edit `INITIAL_POSTS` at the top of `src/pages/Community.jsx`.

**Change colours.** The purple is `#7c3aed` in `src/index.css` and `src/pages/Community.css`.

## Notes

- Navigation uses React state, not URLs, so a refresh returns to Community. When you want real URLs, add [React Router](https://reactrouter.com) and turn each `onNavigate(id)` into a `<Link>` or `navigate()` call.
- The sidebar icons are text symbols (⌂ ◉ ⇄ ▤ ◈ ◎ ♜ ▱ ☆ ⚙), so they inherit the text colour. Their look can vary slightly between operating systems and fonts.
- The logo in `public/logo.png` is cropped from a screenshot, so swap in the original file if you have one.
