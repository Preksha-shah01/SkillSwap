import { useState } from "react";
import Layout from "../components/layout";
import "./SkillExchange.css";

function SkillExchange() {
  const [search, setSearch] = useState("");

  const students = [
    {
      name: "Rahul Patel",
      university: "GSFC University",
      initials: "RP",
      rating: "4.8",
      teaches: ["Figma", "UI/UX"],
      learns: ["React", "Node.js"],
    },
    {
      name: "Ananya Desai",
      university: "MS University",
      initials: "AD",
      rating: "4.8",
      teaches: ["React", "JavaScript"],
      learns: ["Figma", "UI/UX"],
    },
    {
      name: "Meet Solanki",
      university: "GSFC University",
      initials: "MS",
      rating: "4.7",
      teaches: ["Python", "Django"],
      learns: ["Machine Learning"],
    },
  ];

  const filteredStudents = students.filter((student) => {
    const text = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(text) ||
      student.university.toLowerCase().includes(text) ||
      student.teaches.join(" ").toLowerCase().includes(text) ||
      student.learns.join(" ").toLowerCase().includes(text)
    );
  });

  return (
    <Layout>
      <div className="skill-exchange-page">

        {/* PAGE HEADER */}
        <div className="exchange-header">
          <div>
            <h1>Skill Exchange</h1>
            <p>
              Find students to learn from and share your skills with.
            </p>
          </div>

          <button className="my-skills-btn">
            + Add Your Skills
          </button>
        </div>

        {/* SEARCH */}
        <div className="exchange-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Search skills, people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* FILTERS */}
        <div className="exchange-filters">
          <button className="active">All Skills</button>
          <button>Can Teach</button>
          <button>Want to Learn</button>
          <button>All Universities</button>
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

            <span>{filteredStudents.length} matches</span>
          </div>

          <div className="people-grid">

            {filteredStudents.map((student, index) => (
              <div className="person-card" key={index}>

                {/* PROFILE */}
                <div className="person-top">

                  <div className="person-avatar">
                    {student.initials}
                  </div>

                  <div className="person-details">
                    <h3>{student.name}</h3>
                    <p>{student.university}</p>
                  </div>

                  <div className="rating">
                    ★ {student.rating}
                  </div>

                </div>

                {/* CAN TEACH */}
                <div className="skill-group">
                  <span>CAN TEACH</span>

                  <div className="skill-tags">
                    {student.teaches.map((skill, skillIndex) => (
                      <span className="skill-tag teach" key={skillIndex}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* WANTS TO LEARN */}
                <div className="skill-group">
                  <span>WANTS TO LEARN</span>

                  <div className="skill-tags">
                    {student.learns.map((skill, skillIndex) => (
                      <span className="skill-tag learn" key={skillIndex}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* REQUEST */}
                <button
                  className="request-btn"
                  onClick={() => {
                    window.location.href = "/swap-workspace";
                  }}
                >
                  Request Skill Swap
                  <span>→</span>
                </button>

              </div>
            ))}

          </div>

          {filteredStudents.length === 0 && (
            <div className="no-results">
              <h3>No matches found</h3>
              <p>Try searching for another skill or student.</p>
            </div>
          )}

        </section>

      </div>
    </Layout>
  );
}

export default SkillExchange;