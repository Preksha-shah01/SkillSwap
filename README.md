# SkillSwap Login Page

This project contains:
- `react-client/` — React + Vite frontend matching the supplied screenshot.
- `angular-client/` — Angular frontend with the same visual design.
- `server/` — Node.js + Express backend with a demo login API.

## Recommended setup
Use **one frontend at a time** with the Node backend. React and Angular are alternative frontend frameworks; they are not normally used together for the same page.

### 1. Start Node backend
```bash
cd server
npm install
npm start
```

Backend runs on `http://localhost:5000`.

Demo credentials:
- Email: `student@skillswap.edu`
- Password: `skillswap`

### 2A. Start React version
```bash
cd react-client
npm install
npm run dev
```
Open the Vite URL shown in the terminal.

### 2B. Or start Angular version
```bash
cd angular-client
npm install
npm start
```

The UI is responsive and follows the supplied screenshot: dark grid/branding panel on the left and white login panel on the right.
