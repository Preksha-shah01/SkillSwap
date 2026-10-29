
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NoteDetails.css";
import Layout from "../components/layout";

const API_URL = "http://localhost:5000/api/resources";

function NoteDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadResource() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `${API_URL}/${encodeURIComponent(id)}`,
          { signal: controller.signal }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Resource not found."
          );
        }

        setResource(data.resource);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setResource(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadResource();

    return () => controller.abort();
  }, [id]);

  function formatDate(value) {
    if (!value) return "Not available";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Not available";
    }

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function getAuthorName() {
    const author = resource?.uploadedBy;

    if (!author || typeof author !== "object") {
      return "SkillSwap Student";
    }

    return (
      author.name ||
      author.fullName ||
      author.username ||
      "SkillSwap Student"
    );
  }

  async function handleDownload() {
    if (!resource || downloading) return;

    setError("");

    if (resource.storageType !== "file") {
      if (!resource.resourceUrl) {
        setError("No resource link is available.");
        return;
      }

      try {
        const url = new URL(resource.resourceUrl);

        if (!["https:", "http:"].includes(url.protocol)) {
          throw new Error("Invalid resource URL.");
        }

        window.open(
          url.href,
          "_blank",
          "noopener,noreferrer"
        );
      } catch {
        setError("The resource link is invalid.");
      }

      return;
    }

    setDownloading(true);

    try {
      const response = await fetch(
        `${API_URL}/${encodeURIComponent(id)}/download`
      );

      if (!response.ok) {
        throw new Error("Unable to download this file.");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = objectUrl;
      link.download =
        resource.fileName || "SkillSwap-Resource";

      document.body.appendChild(link);
      link.click();
      link.remove();

      // Allow the browser to begin the download.
      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 1000);
    } catch (err) {
      setError(err.message || "Download failed.");
    } finally {
      setDownloading(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="note-details-page">
          <p>Loading resource details...</p>
        </div>
      </Layout>
    );
  }

  if (!resource) {
    return (
      <Layout>
        <div className="note-details-page">
          <button
            className="back-btn"
            onClick={() => navigate("/knowledge-hub")}
          >
            ← Back to Notes
          </button>

          <h2>Resource unavailable</h2>
          <p role="alert">
            {error || "This resource could not be found."}
          </p>
        </div>
      </Layout>
    );
  }

  const authorName = getAuthorName();

  const initials = authorName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const uploadedDate = formatDate(resource.createdAt);

  const fileExtension = resource.fileName
    ? resource.fileName.split(".").pop().toUpperCase()
    : null;

  return (
    <Layout>
      <div className="note-details-page">
        {/* Back Button */}
        <button
          className="back-btn"
          onClick={() => navigate("/knowledge-hub")}
        >
          ← Back to Notes
        </button>

        {/* Note Header */}
        <div className="note-header">
          <div className="note-header-left">
            <div className="note-category">
              {resource.resourceType} • {resource.subject}
            </div>

            <h1>{resource.title}</h1>

            <div className="note-author">
              <div className="author-avatar">
                {initials}
              </div>

              <div className="author-info">
                <strong>{authorName}</strong>
                <span>Uploaded {uploadedDate}</span>
              </div>
            </div>
          </div>

          <div className="note-actions">
            <button
              className="download-btn"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading
                ? "Downloading..."
                : resource.storageType === "file"
                ? "↓ Download"
                : "↗ Open Resource"}
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" style={{ color: "#dc2626" }}>
            {error}
          </p>
        )}

        {/* About */}
        <section className="note-section">
          <h2>About this note</h2>
          <p>{resource.description}</p>
        </section>

        {/* Note Information */}
        <section className="note-section">
          <h2>Note Information</h2>

          <div className="info-grid">
            <div className="info-item">
              <span>Resource Type</span>
              <strong>{resource.resourceType}</strong>
            </div>

            <div className="info-item">
              <span>File Format</span>
              <strong>
                {resource.storageType === "file"
                  ? fileExtension || "File"
                  : "Online Link"}
              </strong>
            </div>

            <div className="info-item">
              <span>Uploaded on</span>
              <strong>{uploadedDate}</strong>
            </div>

            <div className="info-item">
              <span>Subject</span>
              <strong>{resource.subject}</strong>
            </div>
          </div>
        </section>

        {/* File Information */}
        {resource.storageType === "file" &&
          resource.fileName && (
            <section className="note-section">
              <h2>Uploaded File</h2>

              <p>
                <strong>Filename:</strong>{" "}
                {resource.fileName}
              </p>

              {typeof resource.fileSize === "number" && (
                <p>
                  <strong>File size:</strong>{" "}
                  {(
                    resource.fileSize /
                    (1024 * 1024)
                  ).toFixed(2)}{" "}
                  MB
                </p>
              )}
            </section>
          )}

        {/* Tags */}
        <section className="note-section">
          <h2>Tags</h2>

          <div className="tags">
            <span>{resource.subject}</span>
            <span>{resource.resourceType}</span>
            <span>
              {resource.storageType === "file"
                ? "Downloadable"
                : "Online Resource"}
            </span>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default NoteDetails;
