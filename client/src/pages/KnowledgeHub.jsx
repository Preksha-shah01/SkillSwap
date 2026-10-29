
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./KnowledgeHub.css";
import Layout from "../components/layout";

const API_URL = "http://localhost:5000/api/resources";

const categories = [
  "All",
  "Notes",
  "PPTs",
  "Assignments",
  "PYQs",
  "Project Reports",
];

function KnowledgeHub() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadResources() {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: "12",
        });

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (filter !== "All") {
          params.set("resourceType", filter);
        }

        const response = await fetch(
          `${API_URL}?${params.toString()}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load resources."
          );
        }

        setResources(data.resources || []);
        setTotalPages(data.totalPages || 0);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setResources([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadResources();

    return () => controller.abort();
  }, [search, filter, page]);

  function handleSearch(event) {
    setSearch(event.target.value);
    setPage(1);
  }

  function handleFilter(category) {
    setFilter(category);
    setPage(1);
  }

  return (
    <Layout>
      <div className="knowledge-hub">
        <header className="hub-header">
          <div>
            <h1>Knowledge Hub</h1>
            <p>
              Browse and discover resources shared by students.
            </p>
          </div>

          <button
            className="upload-btn"
            onClick={() => navigate("/upload")}
          >
            + Upload Notes
          </button>
        </header>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search notes, subjects, topics..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="filters">
          {categories.map((category) => (
            <button
              key={category}
              className={
                filter === category ? "active" : ""
              }
              onClick={() => handleFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <section className="resources">
          <h2>Available Resources</h2>

          {loading && <p>Loading resources...</p>}

          {error && (
            <p role="alert">
              Unable to load resources: {error}
            </p>
          )}

          {!loading && !error && resources.length === 0 && (
            <p>
              No resources found. Try another search or category.
            </p>
          )}

          {!loading && !error && (
            <div className="resource-grid">
              {resources.map((resource) => (
                <div
                  className="resource-card"
                  key={resource._id}
                >
                  <div className="resource-icon">
                    {resource.storageType === "file"
                      ? "📄"
                      : "🔗"}
                  </div>

                  <h3>{resource.title}</h3>

                  <p>{resource.description}</p>

                  <div className="resource-info">
                    <span>{resource.subject}</span>
                    <span>{resource.resourceType}</span>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/note/${resource._id}`)
                    }
                  >
                    View Notes
                  </button>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                marginTop: "24px",
              }}
            >
              <button
                disabled={page === 1}
                onClick={() =>
                  setPage((current) => current - 1)
                }
              >
                Previous
              </button>

              <span>
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() =>
                  setPage((current) => current + 1)
                }
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}

export default KnowledgeHub;
