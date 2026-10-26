import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../sessions.css';

/* ---------- Icons ---------- */
const ICONS = {
  home: (<><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></>),
  repeat: (<><path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" /><path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" /></>),
  book: (<><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></>),
  wallet: (<><path d="M20 12V8H6a2 2 0 0 1 0-4h12v4" /><path d="M4 6v12a2 2 0 0 0 2 2h14v-4" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" /></>),
  users: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>),
  trophy: (<><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2z" /></>),
  message: (<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>),
  calendar: (<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>),
  sliders: (<><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>),
  bell: (<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>),
  clock: (<><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>),
  plus: (<><path d="M12 5v14M5 12h14" /></>),
  check: (<><path d="M20 6 9 17l-5-5" /></>),
  x: (<><path d="M18 6 6 18M6 6l12 12" /></>),
  arrow: (<><path d="M5 12h14M13 6l6 6-6 6" /></>),
};

function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

function MeetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="6" width="13" height="12" rx="2.5" fill="#00ac47" />
      <path d="M15 10.5 21 6.5v11l-6-4z" fill="#00832d" />
      <path d="M2 8.5A2.5 2.5 0 0 1 4.5 6H9v6H2z" fill="#ea4335" />
      <path d="M2 12h7v6H4.5A2.5 2.5 0 0 1 2 15.5z" fill="#2684fc" />
      <path d="M9 6h6v6H9z" fill="#ffba00" />
    </svg>
  );
}

/* ---------- Sample data (replace with your real data later) ---------- */
const SESSIONS = [
  { id: 3, title: 'Session 3', topic: 'Python Basics', partner: 'Riya Shah', when: 'Today', time: '7:00 PM – 8:00 PM', status: 'upcoming' },
  { id: 4, title: 'Session 4', topic: 'UI/UX Design', partner: 'Aisha Khan', when: 'Wed, 28 Oct', time: '7:00 PM – 8:00 PM', status: 'upcoming' },
  { id: 5, title: 'Session 5', topic: 'React Hooks', partner: 'Dev Patel', when: 'Fri, 30 Oct', time: '7:00 PM – 8:00 PM', status: 'upcoming' },
  { id: 6, title: 'Session 6', topic: 'AI / ML Intro', partner: 'Meera Joshi', when: 'Mon, 2 Nov', time: '7:00 PM – 8:00 PM', status: 'upcoming' },
  { id: 2, title: 'Session 2', topic: 'HTML & CSS', partner: 'Riya Shah', when: 'Thu, 22 Oct', time: '6:00 PM – 7:00 PM', status: 'completed' },
  { id: 1, title: 'Session 1', topic: 'Git & GitHub', partner: 'Karan Mehta', when: 'Mon, 19 Oct', time: '6:00 PM – 7:00 PM', status: 'completed' },
  { id: 0, title: 'Session 0', topic: 'Intro Call', partner: 'Aisha Khan', when: 'Thu, 15 Oct', time: '5:00 PM – 5:30 PM', status: 'completed' },
  { id: 9, title: 'Session 7', topic: 'Data Structures', partner: 'Dev Patel', when: 'Mon, 12 Oct', time: '7:00 PM – 8:00 PM', status: 'cancelled' },
];

const STATUS_LABEL = { upcoming: 'Upcoming', completed: 'Completed', cancelled: 'Cancelled' };

const WORKSPACE_NAV = [
  { label: 'Overview', icon: 'home' },
  { label: 'Profile & Skills', icon: 'user' },
  { label: 'Skill Exchange', icon: 'repeat', badge: 2 },
  { label: 'Knowledge Hub', icon: 'book' },
  { label: 'Wallet', icon: 'wallet' },
  { label: 'Community', icon: 'users' },
  { label: 'Leaderboard', icon: 'trophy' },
];

const SPACE_NAV = [
  { label: 'Messages', icon: 'message', badge: 3 },
  { label: 'Sessions', icon: 'calendar', to: '/sessions' },
  { label: 'Settings', icon: 'sliders' },
];

function NavItem({ item }) {
  const inner = (
    <>
      <Icon name={item.icon} size={20} />
      <span>{item.label}</span>
      {item.badge ? <span className="ss-badge">{item.badge}</span> : null}
    </>
  );
  if (item.to) {
    return (
      <NavLink to={item.to} className={({ isActive }) => 'ss-nav' + (isActive ? ' active' : '')}>
        {inner}
      </NavLink>
    );
  }
  return (
    <a href="#" className="ss-nav" onClick={(e) => e.preventDefault()}>
      {inner}
    </a>
  );
}

export default function Sessions() {
  const [tab, setTab] = useState('upcoming');
  const [query, setQuery] = useState('');

  const counts = useMemo(
    () => ({
      upcoming: SESSIONS.filter((s) => s.status === 'upcoming').length,
      completed: SESSIONS.filter((s) => s.status === 'completed').length,
      cancelled: SESSIONS.filter((s) => s.status === 'cancelled').length,
    }),
    []
  );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SESSIONS.filter(
      (s) => s.status === tab && (s.title + ' ' + s.topic + ' ' + s.partner).toLowerCase().includes(q)
    );
  }, [tab, query]);

  const next = SESSIONS.find((s) => s.status === 'upcoming');

  const today = new Date()
    .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    .toUpperCase();

  const stats = [
    { label: 'Upcoming sessions', value: counts.upcoming, sub: 'next one today', icon: 'calendar' },
    { label: 'Completed', value: counts.completed, sub: 'this month', icon: 'check' },
    { label: 'Hours exchanged', value: 24, sub: 'taught & learned', icon: 'clock' },
    { label: 'Cancelled', value: counts.cancelled, sub: 'this month', icon: 'x' },
  ];

  return (
    <div className="ss-app">
      {/* ---------- Sidebar ---------- */}
      <aside className="ss-side">
        <div className="ss-logo">
          <span className="ss-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
              <line x1="2" y1="14" x2="6" y2="14" /><line x1="10" y1="8" x2="14" y2="8" /><line x1="18" y1="16" x2="22" y2="16" />
            </svg>
          </span>
          SkillSwap
        </div>

        <div className="ss-campus">
          <span className="ss-campus-avatar">G</span>
          <div>
            <small>Your campus</small>
            <strong>GSFC University ▾</strong>
          </div>
        </div>

        <p className="ss-label">WORKSPACE</p>
        <nav className="ss-navlist">
          {WORKSPACE_NAV.map((item) => <NavItem key={item.label} item={item} />)}
        </nav>

        <p className="ss-label">YOUR SPACE</p>
        <nav className="ss-navlist">
          {SPACE_NAV.map((item) => <NavItem key={item.label} item={item} />)}
        </nav>
      </aside>

      {/* ---------- Main ---------- */}
      <div className="ss-main">
        <header className="ss-top">
          <div className="ss-crumb">
            Workspace <span>/</span> <strong>Sessions</strong>
          </div>
          <div className="ss-top-right">
            <label className="ss-search">
              <Icon name="search" size={16} />
              <input
                type="text"
                placeholder="Search sessions, people…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <button type="button" className="ss-iconbtn" aria-label="Notifications">
              <Icon name="bell" size={18} />
              <i className="ss-dot" />
            </button>
            <div className="ss-avatar">AK</div>
          </div>
        </header>

        <div className="ss-content">
          <div className="ss-head">
            <div>
              <p className="ss-eyebrow">{today}</p>
              <h1>Sessions</h1>
              <p className="ss-sub">Your learning and teaching sessions, all in one place.</p>
            </div>
            <button type="button" className="ss-btn primary big" onClick={() => alert('Schedule session: connect this to your form or page')}>
              <Icon name="plus" size={18} /> Schedule session
            </button>
          </div>

          <div className="ss-stats">
            {stats.map((s) => (
              <div className="ss-stat" key={s.label}>
                <div className="ss-stat-top">
                  <span>{s.label}</span>
                  <span className="ss-stat-icon"><Icon name={s.icon} size={16} /></span>
                </div>
                <strong>{s.value}</strong>
                <small>{s.sub}</small>
              </div>
            ))}
          </div>

          <div className="ss-grid">
            {/* Sessions list */}
            <section className="ss-card">
              <div className="ss-card-head">
                <h2>Sessions</h2>
              </div>

              <div className="ss-tabs" role="tablist">
                {['upcoming', 'completed', 'cancelled'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    className={'ss-tab' + (tab === t ? ' active' : '')}
                    onClick={() => setTab(t)}
                  >
                    {STATUS_LABEL[t]} <em>{counts[t]}</em>
                  </button>
                ))}
              </div>

              <div className="ss-list">
                {list.length === 0 && <p className="ss-empty">No sessions found.</p>}

                {list.map((s) => (
                  <div className="ss-row" key={s.id}>
                    <div className="ss-row-main">
                      <strong>{s.title}</strong>
                      <span>{s.topic} · with {s.partner}</span>
                      <span className="ss-when">{s.when}, {s.time}</span>
                    </div>

                    <div className="ss-platform">
                      <MeetIcon /> Google Meet
                    </div>

                    <span className={'ss-status ' + s.status}>{STATUS_LABEL[s.status]}</span>

                    <div className="ss-actions">
                      {s.status === 'upcoming' && (
                        <a className="ss-btn primary" href="https://meet.google.com" target="_blank" rel="noreferrer">Join</a>
                      )}
                      {s.status === 'completed' && <button type="button" className="ss-btn">View notes</button>}
                      {s.status === 'cancelled' && <button type="button" className="ss-btn">Reschedule</button>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Right column */}
            <div className="ss-side-col">
              {next && (
                <section className="ss-next">
                  <p className="ss-eyebrow light">✦ NEXT SESSION</p>
                  <h3>{next.topic}</h3>
                  <p className="ss-next-sub">with {next.partner}</p>
                  <div className="ss-next-meta">
                    <span><Icon name="clock" size={15} /> {next.when}, {next.time}</span>
                    <span><MeetIcon /> Google Meet</span>
                  </div>
                  <a className="ss-btn white" href="https://meet.google.com" target="_blank" rel="noreferrer">
                    Join session <Icon name="arrow" size={16} />
                  </a>
                </section>
              )}

              <section className="ss-card">
                <div className="ss-card-head"><h2>Weekly goal</h2></div>
                <p className="ss-goal-text"><strong>3</strong> of 5 sessions this week</p>
                <div className="ss-progress"><span style={{ width: '60%' }} /></div>
                <small className="ss-muted">Complete 2 more sessions to earn +25 skill coins.</small>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
