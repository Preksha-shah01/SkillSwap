import { Link } from 'react-router-dom';
import '../landing.css';

const STATS = [
  { value: '1.2K+', label: 'Students' },
  { value: '3K+', label: 'Skill exchanges' },
  { value: '8K+', label: 'Hours shared' },
];

export default function Landing() {
  return (
    <div className="lp">
      {/* ---------- Top bar ---------- */}
      <header className="lp-nav">
        <div className="lp-wrap lp-nav-in">
          <Link className="lp-logo" to="/">
            <span className="lp-logo-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                <line x1="2" y1="14" x2="6" y2="14" /><line x1="10" y1="8" x2="14" y2="8" /><line x1="18" y1="16" x2="22" y2="16" />
              </svg>
            </span>
            SkillSwap
          </Link>

          <div className="lp-nav-cta">
            <Link className="lp-btn" to="/login">Log in</Link>
            <Link className="lp-btn" to="/register">Sign up</Link>
          </div>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <main className="lp-wrap lp-main">
        <section className="lp-hero">
          <div>
            <span className="lp-tag">Made for campus</span>

            <h1>
              Learn by Teaching.
              <span>Grow by Sharing.</span>
            </h1>

            <p className="lp-sub">Exchange skills, share knowledge, earn rewards and build your future together.</p>

            <Link className="lp-cta" to="/register">Get started</Link>

            <div className="lp-perks">
              <span>Verified students only</span>
              <span>Free to join</span>
              <span>Earn rewards</span>
            </div>
          </div>

          <div className="lp-photo">
            <img
              src="/hero.jpg"
              alt="Three students smiling and studying together around a laptop"
              width="900"
              height="756"
            />
          </div>
        </section>

        {/* ---------- Stats ---------- */}
        <div className="lp-stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
