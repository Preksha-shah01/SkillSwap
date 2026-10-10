import { useState } from "react";
import "./UploadNotes.css";
import Layout from "../components/layout";

function UploadNotes() {
      const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [resourceType, setResourceType] = useState("Notes");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);


  const handleUpload = () => {
 console.log("Title:", title);
  console.log("Subject:", subject);
  console.log("Resource Type:", resourceType);
  console.log("Description:", description);
  console.log("File:", file);
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
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter the title of your notes"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Subject */}
        <div className="form-group">
          <label>Subject</label>
          <input
  type="text"
  placeholder="Enter subject name"
  value={subject}
  onChange={(e) => setSubject(e.target.value)}
/>
        </div>

        {/* Resource Type */}
        <div className="form-group">
          <label>Resource Type</label>

          <select
  value={resourceType}
  onChange={(e) => setResourceType(e.target.value)}
>
  <option>Notes</option>
  <option>PPTs</option>
  <option>Assignments</option>
  <option>PYQs</option>
  <option>Project Reports</option>
</select>
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description</label>

         <textarea
  placeholder="Describe what these notes contain..."
  rows="4"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
></textarea>
        </div>

        {/* File */}
        <div className="form-group">
          <label>Upload File</label>

          <input
  type="file"
  accept=".pdf,.ppt,.pptx,.doc,.docx"
  onChange={(e) => setFile(e.target.files[0])}
/>
        </div>

        {/* Button */}
        <button
  className="submit-upload"
  onClick={handleUpload}
>
  Upload Notes
</button>
      </div>

    </div>
    </Layout>
  );
}

export default UploadNotes;