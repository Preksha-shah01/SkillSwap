# SkillSwap Full Project (React + Angular + Node.js)

This project contains:
- `react-client/`: React + Vite app. Includes the supplied `layout.jsx` and `layout.css`, plus a responsive registration screen inspired by the screenshot.
- `angular-client/`: Angular registration app.
- `server/`: Express API for demo account registration and login.

## Requirements
Install Node.js (LTS), then open a terminal in each folder and run `npm.cmd install` on Windows (or `npm install` on macOS/Linux).

## Start the Node API
```powershell
cd server
npm.cmd install
npm.cmd start
```
API runs at http://localhost:5000

## Start React
Open a second terminal:
```powershell
cd react-client
npm.cmd install
npm.cmd run dev
```
Open the URL Vite prints (usually http://localhost:5173).

## Start Angular
Open a third terminal:
```powershell
cd angular-client
npm.cmd install
npm.cmd start
```
Open http://localhost:4200

## Demo API
- `POST /api/register` accepts `{ name, email, password, university, department, semester }`.
- `POST /api/login` accepts `{ email, password }`.
- `GET /api/health` checks whether the API is running.

This is a learning/demo app. Accounts are stored in memory and reset whenever the server restarts. Passwords are hashed with bcrypt before storage. For production, use a database, HTTPS, server-side validation, rate limiting, and a proper session/token strategy.


