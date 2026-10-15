# SkillSwap - Register Page (HTML / React / Angular / Node)

```
skillswap-register-full/
├── html/      Plain HTML + CSS + JS version
├── react/     React (Vite) version
├── angular/   Angular 17 (standalone components) version
└── node/      Express + MongoDB backend (register + login API)
```

All three frontends use the same design (same CSS) and call the same API:
`POST http://localhost:5000/api/auth/register`

## 1. Start the backend (Node)
Requires Node 18+ and MongoDB running locally (or a MongoDB Atlas URL).
```
cd node
npm install
copy .env.example .env      (Mac/Linux: cp .env.example .env)
npm run dev
```
Server runs on http://localhost:5000

## 2. Run the React version
```
cd react
npm install
npm run dev
```
Opens on http://localhost:5173

## 3. Run the Angular version
```
cd angular
npm install
npm start
```
Opens on http://localhost:4200

## 4. Run the HTML version
Open the `html` folder in VS Code, right-click `register.html` -> Open with Live Server.
(The HTML version has a TODO in `js/register.js` where you can add a `fetch` call to the API.)

## Notes
- Change the API URL in `react/src/api.js` or `angular/src/app/services/auth.service.ts` if needed.
- If your frontend runs on another port, add it to `CLIENT_ORIGINS` in `node/.env`.
- Colors and font are CSS variables at the top of the CSS file (`:root`) - match them with your login page.
