
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UsersRound,
  SlidersHorizontal,
} from "lucide-react";

import "../styles/login.css";

const API = "http://localhost:5000";

// =====================================
// SKILL SWAP GRAPHIC
// =====================================

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

      <div className="arrowLabel topLabel">
        Python
      </div>

      <div className="arrowLabel bottomLabel">
        UI/UX
      </div>
    </div>
  );
}

// =====================================
// LOGIN PAGE
// =====================================

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================
  // LOGIN API FUNCTION
  // =====================================

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      if (!data.token) {
        throw new Error(
          "Authentication token was not received"
        );
      }

      const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    console.log("Firebase Google sign-in succeeded:", result.user.email);

    // Next step: verify Firebase ID token with Express
    // and obtain the SkillSwap JWT.
  } catch (error) {
    console.error("Google sign-in failed:", error.code, error.message);
    alert(`Google sign-in failed: ${error.code || error.message}`);
  }
};

      // Temporary development session.
      // Do not use browser storage as the final
      // production authentication strategy.
      sessionStorage.setItem(
        "skillswap_token",
        data.token
      );

      setMessage(
        `Login successful! Welcome, ${data.user?.name || "Student"}!`
      );

      // Clear password after successful login
      setPassword("");

      console.log("SkillSwap login successful");
      navigate("/dashboard", { replace: true });

    } catch (error) {
      setMessage(
        error.message ||
        "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  }

  // =====================================
  // LOGIN PAGE DESIGN
  // =====================================

  return (
    <main className="page">
      <section className="authShell">

        {/* LEFT BRAND PANEL */}
        <section className="brandPanel">
          <div className="brandPanelInner">

            <div className="brand">
              <div className="brandLogo">
                <SlidersHorizontal size={25} />
              </div>
              <span>SkillSwap</span>
            </div>

            <div className="hero">
              <div className="eyebrow">
                MADE FOR CAMPUS
              </div>

              <h1>
                Learn. Teach.
                <br />
                Swap skills.
              </h1>

              <p>
                Turn what you know into what you
                want to learn—one student connection
                at a time.
              </p>
            </div>

            <SwapGraphic />

            <div className="bottomNote">
              <CheckCircle2 size={18} />
              <span>
                Built around what students can share
              </span>
            </div>

          </div>
        </section>

        {/* RIGHT LOGIN PANEL */}
        <section className="loginPanel">
          <div className="loginContent">

            <div className="intro">
              <div className="purpleText">
                Connect. Learn. Share.
              </div>

              <h2>Welcome to SkillSwap</h2>

              <p>
                Your campus community is full of
                people worth learning from.
              </p>
            </div>

            {/* LOGIN FORM */}
            <form
              onSubmit={handleSubmit}
              className="loginForm"
            >

              <label htmlFor="login-email">
                College email
              </label>

              <div className="inputWrap">
                <Mail size={21} />

                <input
                  id="login-email"
                  type="email"
                  placeholder="you@college.edu"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  required
                />
              </div>

              <label htmlFor="login-password">
                Password
              </label>

              <div className="inputWrap">
                <LockKeyhole size={21} />

                <input
                  id="login-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="iconButton"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {/* REMEMBER ME */}
              <div className="formOptions">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) =>
                      setRemember(e.target.checked)
                    }
                  />

                  <span className="fakeCheckbox"></span>
                  Remember me
                </label>

                <button
                  type="button"
                  className="linkButton"
                  disabled
                  title="Password reset is coming soon"
                >
                  Forgot password?
                </button>
              </div>

              {/* LOGIN BUTTON */}
              <button
                className="loginButton"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Logging in..."
                  : "Log in"}

                {!loading && (
                  <ArrowRight size={20} />
                )}
              </button>

              {/* STATUS MESSAGE */}
              {message && (
                <div
                  className="status"
                  role="status"
                >
                  {message}
                </div>
              )}

            </form>

            <div className="or">
              <span></span>
              <b>OR</b>
              <span></span>
            </div>

            {/* GOOGLE LOGIN */}
            <button
  className="googleButton"
  type="button"
  onClick={() => navigate("/register")}
>
  <span className="googleG">G</span>
  Continue with Google
          </button>

            {/* SIGNUP */}
            <div className="signup">
              Don't have an account?{" "}
              <button onClick={() => navigate("/register")}
                type="button"
                
                title="Registration page integration is coming soon"
              >
                Sign up
              </button>
            </div>

            {/* DEMO NOTE */}
            <div className="demo">
              Use your registered SkillSwap
              student credentials to log in.
            </div>

          </div>
        </section>

      </section>
    </main>
  );
}

export default Login;
