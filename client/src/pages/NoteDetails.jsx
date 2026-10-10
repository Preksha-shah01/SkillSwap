import "./NoteDetails.css";
import Layout from "../components/layout";

function NoteDetails() {
  return (
    <Layout>

      <div className="note-details-page">

        {/* Back Button */}
        <button className="back-btn">
          ← Back to Notes
        </button>

        {/* Note Header */}
        <div className="note-header">

          <div className="note-header-left">

            <div className="note-category">
              Semester 3 • Computer Science
            </div>

            <h1>Data Structures & Algorithms</h1>

            <div className="note-author">

              <div className="author-avatar">
                RP
              </div>

              <div className="author-info">
                <strong>Rahul Patel</strong>
                <span>Uploaded 12 May 2024</span>
              </div>

            </div>

          </div>

          <div className="note-actions">

            <div className="coin-badge">
              🪙 20 Coins
            </div>

            <button className="download-btn">
              ↓ Download
            </button>

          </div>

        </div>

        {/* About */}
        <section className="note-section">

          <h2>About this note</h2>

          <p>
            Complete Data Structures and Algorithms notes including
            important concepts, examples and solved questions.
          </p>

        </section>

        {/* Note Information */}
        <section className="note-section">

          <h2>Note Information</h2>

          <div className="info-grid">

            <div className="info-item">
              <span>Type</span>
              <strong>PDF</strong>
            </div>

            <div className="info-item">
              <span>Pages</span>
              <strong>50</strong>
            </div>

            <div className="info-item">
              <span>Uploaded on</span>
              <strong>12 May 2024</strong>
            </div>

            <div className="info-item">
              <span>Downloads</span>
              <strong>124</strong>
            </div>

          </div>

        </section>

        {/* Tags */}
        <section className="note-section">

          <h2>Tags</h2>

          <div className="tags">

            <span>DSA</span>
            <span>Algorithms</span>
            <span>Semester 3</span>
            <span>Computer Science</span>

          </div>

        </section>

        {/* Reviews */}
        <section className="note-section reviews-section">

          <div className="reviews-heading">

            <h2>Reviews</h2>

            <span>
              ⭐ 4.6 (10 reviews)
            </span>

          </div>

          <div className="review">

            <div className="review-avatar">
              PM
            </div>

            <div className="review-content">

              <strong>Priya Mehta</strong>

              <div className="review-stars">
                ⭐⭐⭐⭐⭐
              </div>

              <p>
                Great notes! Very useful for exam preparation.
              </p>

            </div>

          </div>

          <div className="review">

            <div className="review-avatar">
              AS
            </div>

            <div className="review-content">

              <strong>Arjun Shah</strong>

              <div className="review-stars">
                ⭐⭐⭐⭐
              </div>

              <p>
                Well organized and easy to understand.
              </p>

            </div>

          </div>

        </section>

      </div>

    </Layout>
  );
}

export default NoteDetails;