
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import "./SkillExchange.css";
import ExchangeRequests from "../components/ExchangeRequests";

const API = "http://localhost:5000";

function SkillExchange() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const token = sessionStorage.getItem("skillswap_token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    async function loadSkills() {
      try {
        setLoading(true);
        setError("");

        const [skillsResponse, userResponse] =
          await Promise.all([
            fetch(`${API}/api/skills?limit=50`, {
              signal: controller.signal,
            }),
            fetch(`${API}/api/auth/me`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              signal: controller.signal,
            }),
          ]);

        if (userResponse.status === 401) {
          sessionStorage.removeItem("skillswap_token");
          navigate("/login", { replace: true });
          return;
        }

        if (!skillsResponse.ok || !userResponse.ok) {
          throw new Error("Unable to load published skills.");
        }

        const skillsData = await skillsResponse.json();
        const userData = await userResponse.json();

        const userId =
          userData.user?._id || userData.user?.id || "";

        setCurrentUserId(String(userId));

        setSkills(
          Array.isArray(skillsData.skills)
            ? skillsData.skills
            : []
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadSkills();

    return () => controller.abort();
  }, [navigate]);

  const filteredSkills = skills.filter((skill) => {
    const owner = skill.offeredBy || {};

    const ownerId =
      typeof owner === "object"
        ? owner._id || owner.id
        : owner;

    // Do not offer a student their own skill.
    if (
      currentUserId &&
      String(ownerId) === currentUserId
    ) {
      return false;
    }

    const searchableText = [
      skill.title,
      skill.description,
      skill.category,
      owner.name,
      owner.university,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(
      search.trim().toLowerCase()
    );
  });

  function requestSwap(skill) {
    navigate("/swap-workspace", {
      state: { skill },
    });
  }

  return (
    <Layout>
      <div className="skill-exchange-page">

        {/* PAGE HEADER */}
        <div className="exchange-header">
          <div>
            <h1>Skill Exchange</h1>
            <p>
              Find students to learn from and share your
              skills with.
            </p>
          </div>

          <button
            className="my-skills-btn"
            onClick={() => navigate("/profile-skills")}
          >
            + Add Your Skills
          </button>
        </div>

        {/* SEARCH */}
        <div className="exchange-search">
          <span aria-hidden="true">⌕</span>

          <input
            type="text"
            placeholder="Search skills, people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTERS */}
        <div className="exchange-filters">
          <button className="active">
            All Skills
          </button>
        </div>

        {/* STUDENTS */}
        <section className="people-section">
          <div className="section-heading">
            <div>
              <h2>Find Your Skill Match</h2>
              <p>
                Students who are ready to exchange knowledge.
              </p>
            </div>

            <span>
              {filteredSkills.length} matches
            </span>
          </div>

          {loading && (
            <p role="status">
              Loading published skills...
            </p>
          )}

          {error && (
            <div className="no-results" role="alert">
              <h3>Unable to load skills</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="people-grid">
              {filteredSkills.map((skill) => {
                const owner = skill.offeredBy || {};
                const name =
                  owner.name || "Student";

                const initials = name
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((part) =>
                    part[0]?.toUpperCase() || ""
                  )
                  .join("");

                return (
                  <div
                    className="person-card"
                    key={skill._id}
                  >
                    {/* PROFILE */}
                    <div className="person-top">
                      <div className="person-avatar">
                        {initials}
                      </div>

                      <div className="person-details">
                        <h3>{name}</h3>
                        <p>
                          {owner.university ||
                            "University not provided"}
                        </p>
                      </div>

                      <div className="rating">
                        {skill.proficiencyLevel ||
                          "Skill"}
                      </div>
                    </div>

                    {/* CAN TEACH */}
                    <div className="skill-group">
                      <span>CAN TEACH</span>

                      <div className="skill-tags">
                        <span className="skill-tag teach">
                          {skill.title}
                        </span>

                        {skill.category && (
                          <span className="skill-tag teach">
                            {skill.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="skill-group">
                      <span>ABOUT THIS SKILL</span>

                      <p>
                        {skill.description ||
                          "No description provided."}
                      </p>
                    </div>

                    {/* REQUEST */}
                    <button
                      className="request-btn"
                      onClick={() => requestSwap(skill)}
                    >
                      Request Skill Swap
                      <span>→</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {!loading &&
            !error &&
            filteredSkills.length === 0 && (
              <div className="no-results">
                <h3>No matches found</h3>
                <p>
                  Try searching for another skill, or
                  ask another student to publish a skill.
                </p>
              </div>
            )}
        </section>
        <ExchangeRequests />
      </div>
    </Layout>
  );
}

export default SkillExchange;
