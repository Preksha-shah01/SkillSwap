import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UsersRound,
  SlidersHorizontal
} from "lucide-react";
import "./styles.css";

const API = "http://localhost:5000";

function SwapGraphic() {
  return (
    <div className="swapGraphic">
      <div className="skillTag python">Python →</div>
      <div className="skillTag ui">UI/UX</div>
      <div className="skillTag reactTag">React</div>
      <div className="skillTag aiml">AI/ML</div>

      <div className="personNode nodeA">
        <BookOpen size={31} strokeWidth={1.8} />
        <span className="badge orange">A</span>
      </div>

      <div className="personNode nodeB">
        <UsersRound size={31} strokeWidth={1.8} />
        <span className="badge purple">B</span>
      </div>

      <div className="swapArrow top">→</div>
      <div className="swapArrow bottom">←</div>
      <div className="arrowLabel topLabel">Python</div>
      <div className="arrowLabel bottomLabel">UI/UX</div>
    </div>
  );
}

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      setMessage("Login successful — welcome to SkillSwap!");
    } catch (error) {
      setMessage(error.message || "Unable to connect to the server.");
    }
  }

  return (
    <main className="page">
      <section className="authShell">
        <section className="brandPanel">
          <div className="brandPanelInner">
            <div className="brand">
              <div className="brandLogo"><SlidersHorizontal size={25} /></div>
              <span>SkillSwap</span>
            </div>

            <div className="hero">
              <div className="eyebrow">MADE FOR CAMPUS</div>
              <h1>Learn. Teach.<br />Swap skills.</h1>
              <p>
                Turn what you know into what you want to learn—one student
                connection at a time.
              </p>
            </div>

            <SwapGraphic />

            <div className="bottomNote">
              <CheckCircle2 size={18} />
              <span>Built around what students can share</span>
            </div>
          </div>
        </section>

        <section className="loginPanel">
          <div className="loginContent">
            <div className="intro">
              <div className="purpleText">Connect. Learn. Share.</div>
              <h2>Welcome to SkillSwap</h2>
              <p>Your campus community is full of people worth learning from.</p>
            </div>

            <form onSubmit={handleSubmit} className="loginForm">
              <label>College email</label>
              <div className="inputWrap">
                <Mail size={21} />
                <input
                  type="email"
                  placeholder="you@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <label>Password</label>
              <div className="inputWrap">
                <LockKeyhole size={21} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="iconButton"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="formOptions">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span className="fakeCheckbox"></span>
                  Remember me
                </label>
                <button type="button" className="linkButton">Forgot password?</button>
              </div>

              <button className="loginButton" type="submit">
                Log in <ArrowRight size={20} />
              </button>

              {message && <div className="status">{message}</div>}
            </form>

            <div className="or"><span></span><b>OR</b><span></span></div>

            <button className="googleButton" type="button">
              <span className="googleG">G</span>
              Continue with Google
            </button>

            <div className="signup">
              Don’t have an account? <button type="button">Sign up</button>
            </div>

            <div className="demo">
              Demo access: student@skillswap.edu · password: skillswap
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
