import React, { useState } from 'react';

const learnSkills = ['Figma, UI/UX', 'React & Frontend', 'Public Speaking'];
const teachSkills = ['Python, Data Science', 'Graphic Design', 'Academic Writing'];
const initialForm = { duration: '', sessions: '', schedule: '', message: '' };
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  { id: 'knowledge', label: 'Knowledge Hub', icon: 'grid' },
  { id: 'exchange', label: 'Skill Exchange', icon: 'swap' },
  { id: 'community', label: 'Community', icon: 'chat' },
  { id: 'sessions', label: 'Sessions', icon: 'calendar' },
  { id: 'library', label: 'My Library', icon: 'book' },
  { id: 'leaderboard', label: 'Leaderboard', icon: 'users' },
  { id: 'help', label: 'Help & Support', icon: 'help' },
];

function Icon({ type, size = 18 }) {
  const paths = {
    logo: <><path d="m3 8 9-5 9 5-9 5-9-5Z"/><path d="M6 10v4c3 2.5 9 2.5 12 0v-4M21 8v6"/></>,
    home: <><path d="m3 10 9-7 9 7M5 9v11h14V9M9 20v-7h6v7"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
    swap: <><path d="m7 7 3-3 3 3M10 4v12a4 4 0 0 0 4 4h3M17 17l-3 3 3 3"/></>,
    chat: <><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21zM4 5v16M8 7h8M8 11h7"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6"/></>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.6 2.6 0 1 1 4.8 1.3c-.8 1.1-2.3 1.2-2.3 2.8M12 17h.01"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    chevron: <path d="m7 10 5 5 5-5"/>,
    arrow: <path d="M7 17 17 7M7 7h10v10"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    send: <><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></>,
    spark: <path d="m12 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z"/>,
    close: <path d="m18 6-12 12M6 6l12 12"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

function PageHeader({ activePage, onNavigate }) {
  const content = {
    dashboard: ['Your learning dashboard', 'A quick look at your skill-swap journey.'],
    knowledge: ['Knowledge Hub', 'Explore skills and ideas shared by the community.'],
    exchange: ['Skill swap request', 'Share what you’d love to learn and exchange your knowledge.'],
    community: ['Community', 'Meet learners, share ideas, and grow together.'],
    sessions: ['Sessions', 'Keep track of your learning and swap requests.'],
    library: ['My Library', 'Your saved learning resources in one place.'],
    leaderboard: ['Leaderboard', 'Celebrate students sharing their knowledge.'],
    help: ['Help & Support', 'Find answers and guidance for using SkillSwap.'],
  }[activePage];
  return <div className="heading">
    <div><div className="eyebrow"><i/> {activePage === 'exchange' ? 'SKILL EXCHANGE' : navItems.find(item => item.id === activePage)?.label.toUpperCase()}</div><h1>{content[0]}</h1><p>{content[1]}</p></div>
    {activePage === 'exchange' && <div className="grow-note"><span><Icon type="spark" size={18}/></span><div><strong>Grow by sharing</strong><small>Every swap is a new opportunity</small></div></div>}
    {activePage === 'dashboard' && <button type="button" className="text-action heading-action" onClick={() => onNavigate('exchange')}>Create a swap <Icon type="arrow" size={15}/></button>}
  </div>;
}

function RequestList({ requests }) {
  return <section className="card request-list">
    <div className="card-head"><div><label>THIS SESSION</label><h2>Requests you created</h2></div><span className="request-count">{requests.length}</span></div>
    {requests.length === 0 ? <p className="empty-state">Requests you submit will appear here for this app session.</p> :
      <div className="submitted-list">{requests.map(request => <article className="submitted-request" key={request.id}>
        <div className="request-row-top"><strong>{request.learnSkill} <span>↔</span> {request.teachSkill}</strong><small>{request.createdAt}</small></div>
        <p>{request.duration} · {request.sessions} · {request.schedule}</p>
        {request.message && <blockquote>{request.message}</blockquote>}
        <span className="local-tag"><Icon type="check" size={12}/> Stored in this session</span>
      </article>)}</div>}
  </section>;
}

function SamplePage({ page, requests, onNavigate }) {
  if (page === 'dashboard') return <div className="view-stack">
    <div className="view-stats">
      <article className="card view-stat"><span className="stat-symbol purple"><Icon type="swap"/></span><small>Swap requests this session</small><strong>{requests.length}</strong></article>
      <article className="card view-stat"><span className="stat-symbol green"><Icon type="calendar"/></span><small>Upcoming sessions</small><strong>2</strong></article>
      <article className="card view-stat"><span className="stat-symbol amber"><Icon type="spark"/></span><small>Skills in progress</small><strong>3</strong></article>
    </div>
    <RequestList requests={requests}/>
    <article className="card view-card"><div className="view-card-heading"><span className="view-card-icon"><Icon type="spark"/></span><div><h2>Ready to learn something new?</h2><p>Choose a skill and set up a fair exchange with Rahul Patel.</p></div></div><button type="button" className="submit view-cta" onClick={() => onNavigate('exchange')}>Open skill exchange <i><Icon type="arrow" size={15}/></i></button></article>
  </div>;

  const pages = {
    knowledge: {
      intro: 'Browse popular topics from students sharing what they know.',
      items: [['Design', 'Figma foundations', 'Start with frames, components, and a practical first prototype.', '8 learning notes'],
        ['Development', 'React & Frontend', 'Build responsive interfaces with reusable components.', '12 learning notes'],
        ['Data', 'Python for beginners', 'Learn the fundamentals through small, hands-on exercises.', '6 learning notes']],
    },
    community: {
      intro: 'A few conversations from the SkillSwap student community.',
      items: [['Ananya Desai · 2 hours ago', 'What helped you learn your first design tool?', 'I’m starting with Figma this week and would love tips from people who have been there.', 'Design · Discussion'],
        ['Meet Solanki · Yesterday', 'Study group: frontend fundamentals', 'We are sharing beginner-friendly resources and meeting for a relaxed weekly practice session.', 'Development · Study group'],
        ['Priya Mehta · 2 days ago', 'Small wins count', 'Finished my first portfolio page after swapping feedback with another student. Keep showing up!', 'Community · Milestone']],
    },
    library: {
      intro: 'Helpful resources picked for the skills you are exploring.',
      items: [['Design · 18 min', 'A beginner’s guide to Figma auto layout', 'Learn how spacing and constraints help your layouts adapt.', 'Saved resource'],
        ['Development · 25 min', 'React components, explained simply', 'A clear starting point for building a UI from smaller parts.', 'Saved resource'],
        ['Study skills · 12 min', 'Make a practical weekly learning plan', 'Break a bigger goal into focused sessions you can finish.', 'Saved resource']],
    },
    leaderboard: {
      intro: 'Students earn recognition by teaching, learning, and contributing.',
      items: [['01 · Ananya Desai', 'Community contributor', 'Shared 18 skills and helped 24 students this semester.', '2,840 points'],
        ['02 · Rahul Patel', 'Knowledge sharer', 'Completed 16 skill swaps with consistently helpful reviews.', '2,560 points'],
        ['03 · Priya Mehta', 'Rising contributor', 'Hosted peer sessions and shared 11 learning resources.', '2,310 points']],
    },
  };

  if (page === 'sessions') return <div className="view-stack">
    <article className="card view-card"><div className="card-head"><div><label>UP NEXT</label><h2>Your upcoming sessions</h2></div><span className="local-tag"><Icon type="calendar" size={12}/> Sample schedule</span></div>
      <div className="session-list"><div className="session-item"><span className="session-date">18<span>OCT</span></span><div><strong>React fundamentals</strong><p>With Ananya Desai · 4:30 PM</p></div><span className="session-pill">Upcoming</span></div><div className="session-item"><span className="session-date">22<span>OCT</span></span><div><strong>Figma basics</strong><p>With Rahul Patel · 11:00 AM</p></div><span className="session-pill">Upcoming</span></div></div>
    </article><RequestList requests={requests}/></div>;

  if (page === 'help') return <div className="view-stack">
    <article className="card view-card"><label>COMMON QUESTIONS</label><h2>How SkillSwap works</h2><div className="faq-list"><div><strong>How do I start a swap?</strong><p>Open Skill Exchange, choose skills to learn and teach, then submit your preferred schedule.</p></div><div><strong>Does submitting a request contact another student?</strong><p>This demo keeps requests in your current app session. It does not send messages or connect to a backend.</p></div><div><strong>Can I change my request?</strong><p>Clear the form to start over. Requests already submitted stay visible until you refresh or close the app.</p></div></div></article>
    <article className="card view-card"><div className="view-card-heading"><span className="view-card-icon"><Icon type="chat"/></span><div><h2>Still need a hand?</h2><p>Reach out to the sample support contact for this demo.</p></div></div><a className="text-action" href="mailto:support@skillswap.example">Email support <Icon type="arrow" size={15}/></a></article>
  </div>;

  const data = pages[page];
  return <div className="view-stack"><p className="view-intro">{data.intro}</p><div className="browse-grid">{data.items.map(([eyebrow, title, description, meta]) => <article className="card browse-card" key={title}><span className="browse-eyebrow">{eyebrow}</span><h2>{title}</h2><p>{description}</p><span className="browse-meta">{meta}</span></article>)}</div></div>;
}

function App() {
  const [activePage, setActivePage] = useState('exchange');
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [requests, setRequests] = useState([]);
  const [learn, setLearn] = useState(learnSkills[0]);
  const [teach, setTeach] = useState(teachSkills[0]);

  const navigate = page => {
    setActivePage(page);
    setStatus(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const update = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  };
  const submit = event => {
    event.preventDefault();
    if (!form.duration || !form.sessions || !form.schedule) {
      setStatus({ type: 'error', text: 'Please complete the duration, number of sessions, and preferred schedule.' });
      return;
    }
    const request = {
      id: `request-${Date.now()}`,
      student: 'Rahul Patel',
      learnSkill: learn,
      teachSkill: teach,
      duration: form.duration,
      sessions: form.sessions,
      schedule: form.schedule,
      message: form.message.trim(),
      createdAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
    };
    setRequests(current => [request, ...current]);
    setStatus({ type: 'success', text: 'Request added to your list for this session. No message was sent.' });
    setForm(initialForm);
  };
  const reset = () => {
    setForm(initialForm);
    setStatus(null);
  };
  const chips = (list, value, setValue, kind) => <div className="chips">{list.map((skill, index) =>
    <button type="button" key={skill} onClick={() => setValue(skill)} className={`chip ${value === skill ? 'selected' : ''}`}>
      <span className={`tiny-icon c${index} ${kind}`}>{kind === 'learn' ? ['✳', '⌘', '◉'][index] : ['⌘', '✦', 'Aa'][index]}</span>
      {skill}{value === skill && <Icon type="check" size={13}/>}
    </button>)}</div>;

  return <div className="shell">
    <aside className="sidebar">
      <button type="button" className="brand brand-button" onClick={() => navigate('dashboard')} aria-label="SkillSwap dashboard"><span className="brand-icon"><Icon type="logo" size={22}/></span><span>Skill<span>Swap</span></span></button>
      <div className="side-label">MENU</div>
      <nav className="nav" aria-label="Main navigation">{navItems.slice(0, 7).map(item =>
        <button type="button" key={item.id} className={`nav-link ${activePage === item.id ? 'active' : ''}`} aria-current={activePage === item.id ? 'page' : undefined} onClick={() => navigate(item.id)}><Icon type={item.icon}/>{item.label}{item.id === 'exchange' && requests.length > 0 && <b>{requests.length}</b>}</button>)}</nav>
      <div className="side-bottom"><button type="button" className={`nav-link ${activePage === 'help' ? 'active' : ''}`} aria-current={activePage === 'help' ? 'page' : undefined} onClick={() => navigate('help')}><Icon type="help"/>Help & Support</button><div className="separator"/><div className="mini-profile"><span className="initial-avatar">MP</span><div><strong>Maya Patel</strong><small>Student account</small></div><span>···</span></div></div>
    </aside>

    <main id="top">
      <header className="topbar">
        <button type="button" className="mobile-brand" onClick={() => navigate('dashboard')}><span className="brand-icon"><Icon type="logo" size={21}/></span>Skill<span>Swap</span></button>
        <div className="crumb">{navItems.find(item => item.id === activePage)?.label} <b>/</b> <strong>{activePage === 'exchange' ? 'Send a Request' : 'Overview'}</strong></div>
        <div className="top-right"><button className="icon-btn" aria-label="Notifications" onClick={() => navigate('sessions')}><Icon type="bell"/>{requests.length > 0 && <i/>}</button><span className="vline"/><div className="top-user"><span className="initial-avatar top-avatar">MP</span>Maya Patel <Icon type="chevron" size={15}/></div></div>
      </header>
      <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(item =>
        <button type="button" key={item.id} className={activePage === item.id ? 'active' : ''} aria-current={activePage === item.id ? 'page' : undefined} onClick={() => navigate(item.id)}><Icon type={item.icon} size={16}/><span>{item.label}</span></button>)}</nav>

      <div className="page">
        <PageHeader activePage={activePage} onNavigate={navigate}/>
        {activePage === 'exchange' ? <div className="layout">
          <section className="left">
            <article className="card profile"><div className="card-head"><div><label>YOUR SWAP PARTNER</label><h2>Student profile</h2></div><span className="profile-link">Sample profile <Icon type="arrow" size={14}/></span></div>
              <div className="person"><div className="avatar"><span className="rahul-avatar">RP</span><i/></div><div className="person-data"><h3>Rahul Patel <span className="verified"><Icon type="check" size={11}/></span></h3><p>OPC University <b>·</b> Computer Science</p><div className="rating"><span>★★★★★</span><strong>4.8</strong><small>(120 reviews)</small></div></div><div className="member"><label>MEMBER SINCE</label><strong>September 2023</strong></div>
              </div><div className="profile-foot"><span><i/>Usually responds within a day</span><span>⌖ &nbsp;Pune, India</span></div>
            </article>
            <div className="skill-grid">
              <article className="card skill-card"><div className="skill-title"><span className="skill-symbol purple"><Icon type="spark" size={17}/></span><div><h2>Want to learn</h2><p>Pick a skill to focus on</p></div></div>{chips(learnSkills, learn, setLearn, 'learn')}</article>
              <article className="card skill-card"><div className="skill-title"><span className="skill-symbol green"><Icon type="book" size={17}/></span><div><h2>You can teach</h2><p>Share what you know best</p></div></div>{chips(teachSkills, teach, setTeach, 'teach')}</article>
            </div>
            <article className="reassure"><span className="reassure-icon"><Icon type="users" size={19}/></span><div><strong>A fair exchange, made simple</strong><p>Skill swaps are built on mutual learning. Both of you choose what to teach, learn, and when to meet.</p></div><span className="reassure-star">✳</span></article>
          </section>
          <section className="card request" id="request"><div className="form-heading"><span className="form-symbol"><Icon type="send" size={18}/></span><div><label>MAKE IT HAPPEN</label><h2>Send swap request</h2><p>Set your preferences. This demo keeps requests in this session.</p></div></div>
            <form onSubmit={submit} noValidate>
              <div className="field"><label htmlFor="duration">Preferred duration <em>*</em></label><div className="select"><select required aria-required="true" id="duration" name="duration" value={form.duration} onChange={update}><option value="">Select session duration</option>{['30 minutes', '45 minutes', '1 hour', '90 minutes'].map(value => <option key={value}>{value}</option>)}</select><Icon type="chevron" size={16}/></div></div>
              <div className="field"><label htmlFor="sessions">Number of sessions <em>*</em></label><div className="select"><select required aria-required="true" id="sessions" name="sessions" value={form.sessions} onChange={update}><option value="">Select number of sessions</option>{['1 session', '2 sessions', '4 sessions', '6 sessions', '8 sessions'].map(value => <option key={value}>{value}</option>)}</select><Icon type="chevron" size={16}/></div></div>
              <div className="field"><label htmlFor="schedule">Preferred schedule <em>*</em></label><div className="select"><select required aria-required="true" id="schedule" name="schedule" value={form.schedule} onChange={update}><option value="">Choose your preferred time</option>{['Weekday mornings', 'Weekday afternoons', 'Weekday evenings', 'Weekend mornings', 'Weekend afternoons', 'I’m flexible'].map(value => <option key={value}>{value}</option>)}</select><Icon type="chevron" size={16}/></div><small className="hint"><Icon type="clock" size={13}/> You can coordinate the exact time later</small></div>
              <div className="field message"><div className="label-row"><label htmlFor="message">Message <span>(optional)</span></label><small>{form.message.length}/300</small></div><textarea id="message" name="message" rows="4" maxLength="300" value={form.message} onChange={update} placeholder="Introduce yourself and share what you hope to learn..."/><small className="hint">A thoughtful note can make all the difference ✨</small></div>
              {status && <div className={`feedback ${status.type}`} role="alert"><Icon type={status.type === 'success' ? 'check' : 'close'} size={15}/><span>{status.text}</span>{status.type === 'success' && <button type="button" onClick={() => setStatus(null)} aria-label="Dismiss"><Icon type="close" size={14}/></button>}</div>}
              <div className="form-actions"><button type="button" className="clear" onClick={reset}>Clear form</button><button type="submit" className="submit"><span>Send swap request</span><i><Icon type="send" size={15}/></i></button></div>
              <p className="privacy"><Icon type="check" size={13}/> Request stays in this app session; no message is sent.</p>
            </form>
          </section>
          <RequestList requests={requests}/>
        </div> : <SamplePage page={activePage} requests={requests} onNavigate={navigate}/>}
        <footer><span>© 2024 SkillSwap</span><span><span>Session-only demo</span><i/> <button type="button" onClick={() => navigate('help')}>Need help?</button></span></footer>
      </div>
    </main>
  </div>;
}

export default App;
