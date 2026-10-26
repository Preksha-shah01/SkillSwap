SkillSwap - React app (Landing + Login + Register + Sessions + Firebase Google sign-in)
======================================================================================
ONE project, ONE server:

    npm install
    npm run dev

Pages (all in the same project, http://localhost:5173):
    /            Landing page   (Log in -> /login, Sign up + Get started -> /register)
    /login       Login          (Sign up -> /register)
    /register    Register       (Log in  -> /login)
    /sessions    Sessions page

Files:
    src/main.jsx             routes
    src/pages/Landing.jsx    landing page
    src/pages/Login.jsx      login page
    src/pages/Register.jsx   register page (university is added automatically)
    src/pages/Sessions.jsx   sessions page (sample data at the top of the file)
    src/landing.css          landing styles (scoped under .lp; sizes scale with screen width)
    src/login.css            login + register styles
    src/sessions.css         sessions styles
    src/firebase.js          Firebase config (Google sign-in)
    src/api.js               calls to the Node backend (only for email + password)
    public/hero.jpg          hero photo on the landing page

If a port is already in use, stop old servers first (PowerShell):
    Get-NetTCPConnection -LocalPort 5173,5174 -State Listen | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
