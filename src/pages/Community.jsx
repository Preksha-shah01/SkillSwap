import { useMemo, useState } from "react";
import "./Community.css";

const TABS = ["All Posts", "Questions", "Resources", "Opportunities"];

const INITIAL_POSTS = [
  {
    id: 1,
    author: "Mevi Solanki",
    initials: "MS",
    hue: 262,
    dept: "Computer Science",
    year: "Semester 5",
    time: "2h ago",
    type: "Questions",
    title: "Need help in OS Page Replacement Algorithms",
    body: "I am finding it difficult to understand LRU and LFU. Can someone explain with examples?",
    tags: ["Operating Systems", "Semester 5"],
    likes: 12,
    comments: 5,
  },
  {
    id: 2,
    author: "Priya Mehta",
    initials: "PM",
    hue: 330,
    dept: "Information Technology",
    year: "Semester 3",
    time: "5h ago",
    type: "Opportunities",
    title: "Looking for Hackathon Team Members!",
    body: "We are participating in Smart India Hackathon. Need 2-3 enthusiastic members. DM if interested.",
    tags: ["Hackathon", "Team"],
    likes: 18,
    comments: 9,
  },
  {
    id: 3,
    author: "Rohan Desai",
    initials: "RD",
    hue: 200,
    dept: "Electronics",
    year: "Semester 7",
    time: "1d ago",
    type: "Resources",
    title: "DBMS normalization cheat sheet (1NF to BCNF)",
    body: "Made a one-page summary with solved examples for every normal form. Free to use for your exam prep.",
    tags: ["DBMS", "Notes"],
    likes: 34,
    comments: 7,
  },
];

const TRENDING = [
  { tag: "Hackathon", count: 24 },
  { tag: "Operating Systems", count: 18 },
  { tag: "Internships", count: 15 },
  { tag: "Data Structures", count: 11 },
];

const CONTRIBUTORS = [
  { name: "Aarav Shah", coins: 480, initials: "AS", hue: 150 },
  { name: "Priya Mehta", coins: 410, initials: "PM", hue: 330 },
  { name: "Kabir Nair", coins: 365, initials: "KN", hue: 30 },
];

const Avatar = ({ initials, hue, size = 40 }) => (
  <span
    className="cm-avatar"
    style={{
      width: size,
      height: size,
      background: `hsl(${hue} 70% 22%)`,
      color: `hsl(${hue} 90% 80%)`,
    }}
    aria-hidden="true"
  >
    {initials}
  </span>
);

export default function Community({ query, setQuery }) {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [tab, setTab] = useState("All Posts");
  const [sort, setSort] = useState("latest");
  const [liked, setLiked] = useState({});
  const [draft, setDraft] = useState({ type: "Questions", title: "", body: "" });

  const visible = useMemo(() => {
    let list = posts.filter(
      (p) =>
        (tab === "All Posts" || p.type === tab) &&
        (p.title + p.body + p.tags.join(" "))
          .toLowerCase()
          .includes(query.toLowerCase())
    );
    if (sort === "top") list = [...list].sort((a, b) => b.likes - a.likes);
    return list;
  }, [posts, tab, sort, query]);

  const toggleLike = (id) => {
    const isLiked = !!liked[id];
    setLiked({ ...liked, [id]: !isLiked });
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, likes: p.likes + (isLiked ? -1 : 1) } : p
      )
    );
  };

  const publish = (e) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: "Aisha K.",
        initials: "AK",
        hue: 20,
        dept: "GSFC University",
        year: "Fall semester",
        time: "Just now",
        type: draft.type,
        title: draft.title.trim(),
        body: draft.body.trim(),
        tags: [draft.type],
        likes: 0,
        comments: 0,
      },
      ...posts,
    ]);
    setDraft({ type: "Questions", title: "", body: "" });
    setTab("All Posts");
    setSort("latest");
  };

  return (
    <div className="cm-page">
      <section className="cm-hero">
        <h1>Community</h1>
        <p>Ask questions, share resources, and find people to build with.</p>
      </section>

      <div className="cm-grid">
        <main>
          <form className="cm-composer" onSubmit={publish}>
            <input
              className="cm-title-input"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              placeholder="What do you want to ask or share?"
              aria-label="Post title"
            />
            <textarea
              value={draft.body}
              onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              placeholder="Add details (optional)"
              rows={2}
              aria-label="Post details"
            />
            <div className="cm-composer-row">
              <select
                value={draft.type}
                onChange={(e) => setDraft({ ...draft, type: e.target.value })}
                aria-label="Post category"
              >
                {TABS.slice(1).map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <button type="submit" className="cm-btn" disabled={!draft.title.trim()}>
                Publish post
              </button>
            </div>
          </form>

          <div className="cm-card cm-feed">
            <div className="cm-feed-head">
              <div className="cm-tabs" role="tablist">
                {TABS.map((t) => (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={tab === t}
                    className={tab === t ? "on" : ""}
                    onClick={() => setTab(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <label className="cm-sort">
                Sort by
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="latest">Latest</option>
                  <option value="top">Most liked</option>
                </select>
              </label>
            </div>

            {visible.length === 0 && (
              <p className="cm-empty">
                No posts match yet. Be the first to start this conversation.
              </p>
            )}

            {visible.map((p) => (
              <article className="cm-post" key={p.id}>
                <div className="cm-meta">
                  <Avatar initials={p.initials} hue={p.hue} />
                  <div className="cm-who">
                    <b>{p.author}</b>
                    <span>{p.dept}</span>
                  </div>
                  <span className="cm-badge">{p.year}</span>
                  <time>{p.time}</time>
                </div>
                <h3>{p.title}</h3>
                {p.body && <p>{p.body}</p>}
                <div className="cm-foot">
                  <div className="cm-tags">
                    {p.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="cm-actions">
                    <button
                      className={liked[p.id] ? "liked" : ""}
                      onClick={() => toggleLike(p.id)}
                      aria-pressed={!!liked[p.id]}
                      aria-label="Like post"
                    >
                      {liked[p.id] ? "♥" : "♡"} {p.likes}
                    </button>
                    <button aria-label="Comments">💬 {p.comments}</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        <aside className="cm-side">
          <div className="cm-card">
            <h4>Trending topics</h4>
            <ul>
              {TRENDING.map((t) => (
                <li key={t.tag}>
                  <button onClick={() => setQuery(t.tag)}>{t.tag}</button>
                  <span>{t.count} posts</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="cm-card">
            <h4>Top contributors</h4>
            <ul>
              {CONTRIBUTORS.map((c) => (
                <li key={c.name}>
                  <Avatar initials={c.initials} hue={c.hue} size={30} />
                  <span className="cm-name">{c.name}</span>
                  <span className="cm-coins">{c.coins} coins</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
