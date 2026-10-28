import "../styles/profileSkills.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getSkills,
  createSkill,
  updateSkill,
  deactivateSkill,
} from "../skillApi";

const emptyForm = {
  title: "",
  description: "",
  category: "",
  proficiencyLevel: "Beginner",
};

export default function ProfileSkills() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadSkills() {
    const result = await getSkills({ limit: 50 });
    setSkills(result.skills || []);
  }

  useEffect(() => {
    const token = sessionStorage.getItem("skillswap_token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    async function loadPage() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load your profile.");
        }

        const data = await response.json();
        setUser(data.user);

        await loadSkills();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [navigate]);

  const mySkills = skills.filter(
    (skill) => skill.offeredBy?._id === user?.id
  );

  const otherSkills = skills.filter(
    (skill) => skill.offeredBy?._id !== user?.id
  );

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      if (editingId) {
        await updateSkill(editingId, form);
        setMessage("Skill updated successfully!");
      } else {
        await createSkill(form);
        setMessage("Skill published successfully!");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadSkills();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(skill) {
    setEditingId(skill._id);
    setForm({
      title: skill.title,
      description: skill.description,
      category: skill.category,
      proficiencyLevel: skill.proficiencyLevel,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDeactivate(id) {
    if (!window.confirm("Deactivate this skill?")) return;

    try {
      setError("");
      await deactivateSkill(id);
      setMessage("Skill deactivated successfully.");
      await loadSkills();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <p style={{ padding: 32 }}>Loading your profile...</p>;
  }

  return (
    <main className="profile-skills-page">
      <header className="profile-skills-header">
        <button onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>

        <h1>Profile & Skills</h1>
        <p>Share what you know. Learn what you love.</p>
      </header>

      {error && <p className="profile-error">{error}</p>}
      {message && <p className="profile-success">{message}</p>}

      <section className="profile-skills-card">
        <h2>My Profile</h2>
        <p><strong>Name:</strong> {user?.name || "—"}</p>
        <p><strong>Email:</strong> {user?.email || "—"}</p>
        <p><strong>University:</strong> {user?.university || "—"}</p>
        <p><strong>Department:</strong> {user?.department || "—"}</p>
        <p><strong>Semester:</strong> {user?.semester || "—"}</p>
        <p><strong>Skill Coins:</strong> {user?.coins ?? 0}</p>
      </section>

      <section className="profile-skills-card">
        <h2>{editingId ? "Edit Skill" : "Publish a Skill"}</h2>

        <form onSubmit={handleSubmit} className="skill-form">
          <label>
            Skill Title
            <input
              value={form.title}
              maxLength={100}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              placeholder="e.g. Python Programming"
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={form.description}
              maxLength={1000}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="What can you teach?"
              required
            />
          </label>

          <label>
            Category
            <input
              value={form.category}
              maxLength={100}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              placeholder="e.g. Programming"
              required
            />
          </label>

          <label>
            Proficiency Level
            <select
              value={form.proficiencyLevel}
              onChange={(e) =>
                setForm({
                  ...form,
                  proficiencyLevel: e.target.value,
                })
              }
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </label>

          <button type="submit" disabled={saving}>
            {saving
              ? "Saving..."
              : editingId
                ? "Update Skill"
                : "Publish Skill"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
            >
              Cancel Editing
            </button>
          )}
        </form>
      </section>

      <section className="profile-skills-card">
        <h2>My Published Skills</h2>

        {mySkills.length === 0 ? (
          <p>You haven't published any skills yet.</p>
        ) : (
          mySkills.map((skill) => (
            <article key={skill._id} className="skill-item">
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <p>
                {skill.category} · {skill.proficiencyLevel}
              </p>

              <button onClick={() => handleEdit(skill)}>
                Edit
              </button>

              <button
                onClick={() => handleDeactivate(skill._id)}
              >
                Deactivate
              </button>
            </article>
          ))
        )}
      </section>

      <section className="profile-skills-card">
        <h2>Explore Campus Skills</h2>

        {otherSkills.length === 0 ? (
          <p>No other skills available yet.</p>
        ) : (
          otherSkills.map((skill) => (
            <article key={skill._id} className="skill-item">
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <p>
                Offered by: {skill.offeredBy?.name || "Student"}
              </p>
              <p>
                {skill.category} · {skill.proficiencyLevel}
              </p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
