
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import "./SwapWorkspace.css";

function SwapWorkspace() {
  const navigate = useNavigate();

  const [message, setMessage] = useState(
    "Hi Rahul! I'd love to learn Figma from you. I can help you with React and Node.js in return..."
  );

  const [requestSent, setRequestSent] = useState(false);

  const handleSendRequest = () => {
    if (message.trim() === "") {
      return;
    }

    setRequestSent(true);
  };

  const handleCancel = () => {
    navigate("/skill-exchange");
  };

  return (
    <Layout>
      <div className="swap-workspace-page">

        {/* HEADER */}
        <div className="swap-header">
          <div>
            <h1>Swap Workspace</h1>
            <p>
              Manage your skill exchange and collaborate with your match.
            </p>
          </div>

          <span className="swap-status">
            ● Active
          </span>
        </div>

        {/* MATCH CARD */}
        <section className="swap-match-card">

          <div className="match-top">

            <div className="match-avatar">
              RP
            </div>

            <div className="match-info">
              <h2>Rahul Patel</h2>
              <p>GSFC University</p>
              <span>★ 4.8 rating</span>
            </div>

            <div className="match-label">
              Skill Match
            </div>

          </div>

          {/* SKILLS */}
          <div className="swap-skills">

            <div className="swap-skill-column">
              <span className="skill-heading">
                YOU WANT TO LEARN
              </span>

              <div className="swap-skill-tag">
                Figma
              </div>

              <div className="swap-skill-tag">
                UI/UX
              </div>
            </div>

            <div className="swap-arrow">
              ⇄
            </div>

            <div className="swap-skill-column">
              <span className="skill-heading">
                YOU CAN OFFER
              </span>

              <div className="swap-skill-tag">
                React
              </div>

              <div className="swap-skill-tag">
                Node.js
              </div>
            </div>

          </div>

        </section>

        {/* REQUEST SECTION */}
        <section className="request-section">

          <div className="section-title">
            <h2>Send Skill Swap Request</h2>

            <p>
              Introduce yourself and tell Rahul what you would like
              to learn.
            </p>
          </div>

          <label>Message</label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={requestSent}
            placeholder="Write your message..."
          />

          {/* SUCCESS MESSAGE */}
          {requestSent && (
            <div className="request-success">
              ✓ Skill swap request sent successfully!
            </div>
          )}

          <div className="request-actions">

            {/* CANCEL */}
            <button
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>

            {/* SEND REQUEST */}
            <button
              className="send-request-btn"
              onClick={handleSendRequest}
              disabled={requestSent}
            >
              {requestSent ? "Request Sent ✓" : "Send Request"}

              {!requestSent && <span>→</span>}
            </button>

          </div>

        </section>

        {/* HOW IT WORKS */}
        <section className="how-it-works">

          <h2>How Skill Swap Works</h2>

          <div className="steps">

            <div className="step">
              <div className="step-number">1</div>

              <div>
                <h3>Send Request</h3>

                <p>
                  Send a request to your skill match.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>

              <div>
                <h3>Get Accepted</h3>

                <p>
                  Your match accepts the skill exchange.
                </p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>

              <div>
                <h3>Start Learning</h3>

                <p>
                  Connect and start your skill exchange.
                </p>
              </div>
            </div>

          </div>

        </section>

      </div>
    </Layout>
  );
}

export default SwapWorkspace;

