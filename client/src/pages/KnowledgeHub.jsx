import { useState } from "react";
import "./KnowledgeHub.css";
import Layout from "../components/layout";

function KnowledgeHub() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  return (
<Layout>
       <div className="knowledge-hub">

      {/* Page Header */}
      <header className="hub-header">
        <div>
          <h1>Knowledge Hub</h1>
          <p>Browse and discover resources shared by students.</p>
        </div>

        <button
  className="upload-btn"
  onClick={() => window.location.href = "/upload"}
>
  + Upload Notes
</button>
      </header>


      {/* Search */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search notes, subjects, topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>


      {/* Filters */}
      <div className="filters">

        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>

        <button
          className={filter === "Notes" ? "active" : ""}
          onClick={() => setFilter("Notes")}
        >
          Notes
        </button>

        <button
          className={filter === "PPTs" ? "active" : ""}
          onClick={() => setFilter("PPTs")}
        >
          PPTs
        </button>

        <button
          className={filter === "Assignments" ? "active" : ""}
          onClick={() => setFilter("Assignments")}
        >
          Assignments
        </button>

        <button
          className={filter === "PYQs" ? "active" : ""}
          onClick={() => setFilter("PYQs")}
        >
          PYQs
        </button>

        <button
          className={filter === "Project Reports" ? "active" : ""}
          onClick={() => setFilter("Project Reports")}
        >
          Project Reports
        </button>

      </div>


      {/* Resources */}
      <section className="resources">

        <h2>Popular Resources</h2>

        <div className="resource-grid">

          {/* DSA */}
          {(filter === "All" || filter === "Notes") &&
            "Data Structures & Algorithms Complete notes Computer Science"
              .toLowerCase()
              .includes(search.toLowerCase()) && (

              <div className="resource-card">

                <div className="resource-icon">📄</div>

                <h3>Data Structures & Algorithms</h3>

                <p>
                  Complete notes covering important DSA concepts.
                </p>

                <div className="resource-info">
                  <span>Computer Science</span>
                  <span>+20 Coins</span>
                </div>

            <button onClick={() => window.location.href = "/note/1"}>
  View Notes
</button>
              </div>
            )}


          {/* DBMS */}
          {(filter === "All" || filter === "Notes") &&
            "Database Management Systems DBMS SQL concepts important questions"
              .toLowerCase()
              .includes(search.toLowerCase()) && (

              <div className="resource-card">

                <div className="resource-icon">📊</div>

                <h3>Database Management Systems</h3>

                <p>
                  DBMS notes, SQL concepts and important questions.
                </p>

                <div className="resource-info">
                  <span>DBMS</span>
                  <span>+15 Coins</span>
                </div>

                <button onClick={() => window.location.href = "/note/1"}>
  View Notes
</button>

              </div>
            )}


          {/* Computer Networks */}
          {(filter === "All" || filter === "Notes") &&
            "Computer Networks Unit-wise notes exam preparation material"
              .toLowerCase()
              .includes(search.toLowerCase()) && (

              <div className="resource-card">

                <div className="resource-icon">📚</div>

                <h3>Computer Networks</h3>

                <p>
                  Unit-wise notes and exam preparation material.
                </p>

                <div className="resource-info">
                  <span>Computer Networks</span>
                  <span>+20 Coins</span>
                </div>

                <button onClick={() => window.location.href = "/note/1"}>
  View Notes
</button>

              </div>
            )}

        </div>

      </section>

    </div>
    </Layout> 
     );
}

export default KnowledgeHub;