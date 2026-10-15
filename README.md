# SkillSwap - Login Page (HTML / React / Angular / Node)

```
skillswap-login/
├── single-file/login.html   ONE file (CSS + JS inside) - easiest, just open it
├── html/                    login.html + css/login.css + js/login.js
├── react/                   React (Vite) login page
├── angular/                 Angular 17 login page
└── node/                    Express + MongoDB API (login endpoint + demo user seed)
```

## Quick preview (no setup)
Open `single-file/login.html` in your browser (or right-click -> Open with Live Server in VS Code).
The page will look right immediately. Logging in needs the Node backend running (below).

## 1. Backend (Node) - needs Node 18+ and MongoDB
```
cd node
npm install
copy .env.example .env      (Mac/Linux: cp .env.example .env)
npm run seed                creates demo user: student@skillswap.edu / skillswap
npm run dev                 runs on http://localhost:5000
```

## 2. React
```
cd react
npm install
npm run dev                 http://localhost:5173/login
```

## 3. Angular
```
cd angular
npm install
npm start                   http://localhost:4200/login
```

## Notes
- The "Sign up" link points to `register.html` (HTML) or `/register` (React/Angular). Add your register page there.
- Colors and font are CSS variables at the top of the CSS (`:root`).
- If your frontend runs on another port, add it to `CLIENT_ORIGINS` in `node/.env`.
