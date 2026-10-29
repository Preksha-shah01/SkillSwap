
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadNotes.css";
import Layout from "../components/layout";

const API_URL = "http://localhost:5000/api/resources/upload";

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function UploadNotes() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [resourceType, setResourceType] = useState("Notes");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpload = async () => {
    if (loading) return;

    setError("");
    setSuccess("");

    if (
      !title.trim() ||
      !subject.trim() ||
      !description.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const extension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setError(
        "Only PDF, Word and PowerPoint files are allowed."
      );
      return;
    }

    if (file.size === 0 || file.size > MAX_FILE_SIZE) {
      setError(
        "Please select a non-empty file smaller than 10 MB."
      );
      return;
    }

    const token = sessionStorage.getItem("skillswap_token");

    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title.trim());
    formData.append("subject", subject.trim());
    formData.append("resourceType", resourceType);
    formData.append("description", description.trim());
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "File upload failed."
        );
      }

      setSuccess("File uploaded successfully!");

      setTimeout(() => {
        navigate("/knowledge-hub");
      }, 1000);
    } catch (err) {
      setError(
        err.message || "Something went wrong during upload."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="upload-page">
        <div className="upload-container">
          <h1>Upload Notes</h1>

          <p className="upload-subtitle">
            Share your knowledge with other students.
          </p>

          {/* Title */}
          <div className="form-group">
            <label htmlFor="resource-title">Title</label>
            <input
              id="resource-title"
              type="text"
              placeholder="Enter the title of your notes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Subject */}
          <div className="form-group">
            <label htmlFor="resource-subject">Subject</label>
            <input
              id="resource-subject"
              type="text"
              placeholder="Enter subject name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Resource Type */}
          <div className="form-group">
            <label htmlFor="resource-type">Resource Type</label>
            <select
              id="resource-type"
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              disabled={loading}
            >
              <option value="Notes">Notes</option>
              <option value="PPTs">PPTs</option>
              <option value="Assignments">Assignments</option>
              <option value="PYQs">PYQs</option>
              <option value="Project Reports">
                Project Reports
              </option>
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="resource-description">
              Description
            </label>
            <textarea
              id="resource-description"
              placeholder="Describe what these notes contain..."
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* File */}
          <div className="form-group">
            <label htmlFor="resource-file">Upload File</label>
            <input
              id="resource-file"
              type="file"
              accept=".pdf,.ppt,.pptx,.doc,.docx"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setError("");
              }}
              disabled={loading}
            />
          </div>

          {/* Error and success messages */}
          {error && (
            <p role="alert" style={{ color: "#dc2626" }}>
              {error}
            </p>
          )}

          {success && (
            <p role="status" style={{ color: "#15803d" }}>
              {success}
            </p>
          )}

          {/* Upload Button */}
          <button
            className="submit-upload"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Notes"}
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default UploadNotes;
