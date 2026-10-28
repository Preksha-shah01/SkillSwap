
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import "./SwapWorkspace.css";

const API = "http://localhost:5000";

function SwapWorkspace() {
  const navigate = useNavigate();
  const location = useLocation();

  // The selected skill will be passed from Skill Exchange.
  const skill = location.state?.skill;

  const [message, setMessage] = useState("");
  const [mySkills, setMySkills] = useState([]);
  const [requestSent, setRequestSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const owner = skill?.offeredBy;
  const ownerName = owner?.name || "Student";
  const university = owner?.university || "University not provided";

  const initials = ownerName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

  useEffect(() => {
    const token = sessionStorage.getItem("skillswap_token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const controller = new AbortController();

    async function loadMySkills() {
      try {
        const [userResponse, skillsResponse] = await Promise.all([
          fetch(`${API}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }),
          fetch(`${API}/api/skills?limit=50`, {
            signal: controller.signal,
          }),
        ]);

        if (!userResponse.ok || !skillsResponse.ok) {
          throw new Error("Unable to load your skills.");
        }

        const userData = await userResponse.json();
        const skillsData = await skillsResponse.json();

        const userId = userData.user?._id;

        const ownedSkills = (skillsData.skills || []).filter(
          (item) =>
            String(item.offeredBy?._id) === String(userId)
        );

        setMySkills(ownedSkills);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      }
    }

    loadMySkills();

    return () => controller.abort();
  }, [navigate]);

  async function handleSendRequest() {
    if (!skill?._id) {
      setError("Please select a skill from Skill Exchange.");
      return;
    }

    if (message.length > 500) {
      setError("Your message must be 500 characters or fewer.");
      return;
    }

    const token = sessionStorage.getItem("skillswap_token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    setSending(true);
    setError("");

    try {
      const response = await fetch(`${API}/api/exchanges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          skillId: skill._id,
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to send request."
        );
      }

      setRequestSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  function handleCancel() {
    navigate("/skill-exchange");
  }

  return (
    <Layout>
      <div className="swap-workspace-page">
        <div className="swap-header">
          <div>
            <h1>Swap Workspace</h1>
            <p>
              Manage your skill exchange and collaborate
              with your match.
            </p>
          </div>

          <span className="swap-status">
            {requestSent ? "Pending" : "New Request"}
          </span>
        </div>

        {!skill ? (
          <section className="request-section">
            <h2>No skill selected</h2>
            <p>
              Please choose a published skill before
              sending an exchange request.
            </p>
            <button
              className="cancel-btn"
              onClick={handleCancel}
            >
              Browse Skills
            </button>
          </section>
        ) : (
          <>
            <section className="swap-match-card">
              <div className="match-top">
                <div className="match-avatar">
                  {initials}
                </div>

                <div className="match-info">
                  <h2>{ownerName}</h2>
                  <p>{university}</p>
                  <span>
                    {skill.proficiencyLevel || "Skill offering"}
                  </span>
                </div>

                <div className="match-label">
                  Skill Match
                </div>
              </div>

              <div className="swap-skills">
                <div className="swap-skill-column">
                  <span className="skill-heading">
                    YOU WANT TO LEARN
                  </span>

                  <div className="swap-skill-tag">
                    {skill.title}
                  </div>
                </div>

                <div className="swap-arrow">
                  ⇄
                </div>

                <div className="swap-skill-column">
                  <span className="skill-heading">
                    YOUR PUBLISHED SKILLS
                  </span>

                  {mySkills.length > 0 ? (
                    mySkills.map((item) => (
                      <div
                        className="swap-skill-tag"
                        key={item._id}
                      >
                        {item.title}
                      </div>
                    ))
                  ) : (
                    <p>No published skills yet.</p>
                  )}
                </div>
              </div>
            </section>

            <section className="request-section">
              <div className="section-title">
                <h2>Send Skill Swap Request</h2>
                <p>
                  Introduce yourself and tell {ownerName}
                  {" "}why you want to learn {skill.title}.
                </p>
              </div>

              <label htmlFor="swap-message">
                Message (optional)
              </label>

              <textarea
                id="swap-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={requestSent || sending}
                maxLength={500}
                placeholder="Write your message..."
              />

              {error && (
                <div role="alert" style={{ color: "#ff8080" }}>
                  {error}
                </div>
              )}

              {requestSent && (
                <div className="request-success" role="status">
                  ✓ Skill swap request sent successfully!
                </div>
              )}

              <div className="request-actions">
                <button
                  className="cancel-btn"
                  onClick={handleCancel}
                >
                  {requestSent ? "Back to Skills" : "Cancel"}
                </button>

                <button
                  className="send-request-btn"
                  onClick={handleSendRequest}
                  disabled={requestSent || sending}
                >
                  {sending
                    ? "Sending..."
                    : requestSent
                    ? "Request Sent ✓"
                    : "Send Request"}
                </button>
              </div>
            </section>
          </>
        )}

        <section className="how-it-works">
          <h2>How Skill Swap Works</h2>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div>
                <h3>Send Request</h3>
                <p>Request a published skill.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div>
                <h3>Get Accepted</h3>
                <p>The skill owner reviews your request.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div>
                <h3>Start Learning</h3>
                <p>Connect and begin exchanging knowledge.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default SwapWorkspace;
