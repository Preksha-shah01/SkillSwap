import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Trophy, Medal, Sparkles, ChevronDown, ArrowUpRight, Flame, Zap, BookOpen, Users, LayoutDashboard, Repeat2, MessageCircle, CalendarDays, Settings, Bell, Menu } from 'lucide-react';

const students = [
  { id: 1, name: 'Aarav Mehta', major: 'Computer Science', year: '3rd year', avatar: 'AM', color: 'lavender', daily: 180, weekly: 1240, monthly: 4680, overall: 12840, streak: 12, skills: 'React · UI Design' },
  { id: 2, name: 'Priya Shah', major: 'Information Technology', year: '2nd year', avatar: 'PS', color: 'rose', daily: 165, weekly: 1190, monthly: 4420, overall: 11620, streak: 8, skills: 'Python · Data Science' },
  { id: 3, name: 'Rohan Patel', major: 'Computer Engineering', year: '4th year', avatar: 'RP', color: 'mint', daily: 145, weekly: 1080, monthly: 4150, overall: 10890, streak: 16, skills: 'Node.js · Java' },
  { id: 4, name: 'Ananya Desai', major: 'Electronics & Communication', year: '3rd year', avatar: 'AD', color: 'peach', daily: 140, weekly: 960, monthly: 3890, overall: 9740, streak: 5, skills: 'Figma · UX Research' },
  { id: 5, name: 'Kabir Nair', major: 'Computer Science', year: '2nd year', avatar: 'KN', color: 'blue', daily: 115, weekly: 910, monthly: 3540, overall: 9210, streak: 10, skills: 'Algorithms · C++' },
  { id: 6, name: 'Meera Iyer', major: 'Information Technology', year: '3rd year', avatar: 'MI', color: 'pink', daily: 108, weekly: 850, monthly: 3270, overall: 8640, streak: 7, skills: 'Machine Learning · Python' },
  { id: 7, name: 'Dev Malhotra', major: 'Computer Engineering', year: '4th year', avatar: 'DM', color: 'mint', daily: 95, weekly: 780, monthly: 2960, overall: 7910, streak: 4, skills: 'Cloud · DevOps' },
  { id: 8, name: 'Isha Kulkarni', major: 'Design', year: '2nd year', avatar: 'IK', color: 'lavender', daily: 82, weekly: 720, monthly: 2780, overall: 7460, streak: 9, skills: 'Illustration · Figma' },
  { id: 9, name: 'Vikram Rao', major: 'Mathematics', year: '3rd year', avatar: 'VR', color: 'peach', daily: 74, weekly: 640, monthly: 2490, overall: 6820, streak: 3, skills: 'Statistics · SQL' },
  { id: 10, name: 'Sana Qureshi', major: 'Information Technology', year: '1st year', avatar: 'SQ', color: 'rose', daily: 68, weekly: 580, monthly: 2180, overall: 6130, streak: 6, skills: 'Web Development · CSS' },
  { id: 11, name: 'Arjun Menon', major: 'Computer Science', year: '2nd year', avatar: 'AM', color: 'blue', daily: 54, weekly: 490, monthly: 1940, overall: 5480, streak: 2, skills: 'Java · Spring' },
  { id: 12, name: 'Nisha Verma', major: 'Business Analytics', year: '3rd year', avatar: 'NV', color: 'pink', daily: 42, weekly: 420, monthly: 1680, overall: 4920, streak: 11, skills: 'Excel · Data Analytics' },
];
const periods = [
  { key: 'daily', label: 'Daily', hint: 'Today, Oct 13', unit: 'pts today' },
  { key: 'weekly', label: 'Weekly', hint: 'This week', unit: 'pts this week' },
  { key: 'monthly', label: 'Monthly', hint: 'This month', unit: 'pts this month' },
  { key: 'overall', label: 'Overall', hint: 'All time', unit: 'total points' },
];
const notificationStorageKey = 'skillswap-demo-notifications-v1';
const sampleNotifications = [
  { id: 'swap-request', title: 'New skill-swap request', message: 'Priya Shah wants to learn React from you.', timestamp: '10 min ago', read: false },
  { id: 'request-accepted', title: 'Request accepted', message: 'Aarav Mehta accepted your Python exchange request.', timestamp: '1 hour ago', read: false },
  { id: 'upcoming-session', title: 'Upcoming session', message: 'Your UI/UX design session starts today at 3:30 PM.', timestamp: 'Today', read: false },
  { id: 'community-reply', title: 'New community reply', message: 'Rohan Patel replied to your portfolio review post.', timestamp: '3 hours ago', read: false },
  { id: 'points-earned', title: 'Points earned', message: 'You earned 25 points for completing a skill exchange.', timestamp: 'Yesterday', read: false },
];
function loadNotifications() {
  try {
    const saved = localStorage.getItem(notificationStorageKey);
    if (saved === null) return sampleNotifications.map((notification) => ({ ...notification }));
    const parsed = JSON.parse(saved);
    const valid = Array.isArray(parsed) && parsed.every((notification) => notification && typeof notification.id === 'string' && typeof notification.title === 'string' && typeof notification.message === 'string' && typeof notification.timestamp === 'string' && typeof notification.read === 'boolean');
    if (valid) return parsed;
  } catch {
    // If saved data cannot be read, recover with the demo items marked read
    // so a refresh never recreates unread activity from corrupted storage.
  }
  return sampleNotifications.map((notification) => ({ ...notification, read: true }));
}
const nav = [
  { label: 'Dashboard', icon: LayoutDashboard }, { label: 'Skill Exchange', icon: Repeat2 }, { label: 'Knowledge Hub', icon: BookOpen }, { label: 'Community', icon: MessageCircle }, { label: 'Sessions', icon: CalendarDays }, { label: 'Leaderboard', icon: Trophy },
];
function Avatar({ person, size = '' }) { return <div className={`avatar ${person.color} ${size}`} aria-label={`${person.name} avatar`}>{person.avatar}</div>; }
function Sidebar({ open, section, onNavigate }) {
  const choose = (name) => onNavigate(name);
  return <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
    <a className="brand" href="#top" aria-label="SkillSwap home" onClick={(event) => { event.preventDefault(); choose('Dashboard'); }}><span className="brand-mark"><Sparkles size={17} /></span><span>Skill<span>Swap</span></span></a>
    <div className="uni-card"><div className="uni-icon">✦</div><div><small>YOUR UNIVERSITY</small><b>OPC University</b></div><ChevronDown size={15} /></div>
    <p className="side-label">WORKSPACE</p>
    <nav>{nav.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${section === label ? 'active' : ''}`} onClick={() => choose(label)} aria-current={section === label ? 'page' : undefined}><Icon size={17} /><span>{label}</span></button>)}</nav>
    <div className="sidebar-bottom">
      <div className="help-card"><div className="help-orb"><Sparkles size={16} /></div><b>Keep the momentum</b><p>Every skill you share helps someone grow.</p><button onClick={() => choose('Skill Exchange')}>Explore skills <ArrowUpRight size={14} /></button></div>
      <button className={`nav-item ${section === 'Settings' ? 'active' : ''}`} onClick={() => choose('Settings')} aria-current={section === 'Settings' ? 'page' : undefined}><Settings size={17} /><span>Settings</span></button>
      <div className="profile-mini"><div className="avatar profile-pic">PS</div><div><b>Preksha Shah</b><small>Student account</small></div><button aria-label="Profile options" onClick={() => choose('My Profile')}><ChevronDown size={15} /></button></div>
    </div>
  </aside>;
}
function Podium({ leaders }) { const slots = [leaders[1], leaders[0], leaders[2]]; const places = [2, 1, 3]; return <div className="podium">{slots.map((student, i) => student ? <article key={student.id} className={`podium-card place-${places[i]}`}><div className="podium-medal">{places[i] === 1 ? <Trophy size={17} /> : <Medal size={17} />}</div><div className="podium-avatar-wrap"><Avatar person={student} size="large" /><span className={`place-badge badge-${places[i]}`}>{places[i]}</span></div><h3>{student.name}</h3><p>{student.major}</p><div className="podium-points">{student.points.toLocaleString()} <small>pts</small></div><div className="podium-bar"><span>{places[i] === 1 ? 'TOP CONTRIBUTOR' : places[i] === 2 ? 'RUNNER UP' : 'RISING STAR'}</span></div></article> : <div className="podium-card podium-empty" key={i} />)}</div>; }
function StudentRow({ student, index, unit }) { return <div className={`student-row ${index < 3 ? `top-row rank-${index + 1}` : ''}`}><div className="rank-number">{index < 3 && <span className={`rank-dot dot-${index + 1}`}>{index + 1}</span>}{index >= 3 && <span>{String(index + 1).padStart(2, '0')}</span>}</div><div className="student-cell"><Avatar person={student} /><div className="student-text"><b>{student.name}</b><span>{student.major}</span></div></div><div className="skills-cell">{student.skills.split(' · ').slice(0, 2).map(skill => <span className="skill-tag" key={skill}>{skill}</span>)}</div><div className="streak-cell"><Flame size={14} /> {student.streak} days</div><div className="points-cell"><b>{student.points.toLocaleString()}</b><span>{unit}</span></div></div>; }
export default function App() {
  const [period, setPeriod] = useState('overall'); const [search, setSearch] = useState(''); const [mobileNav, setMobileNav] = useState(false); const [section, setSection] = useState('Leaderboard');
  const [shareOpen, setShareOpen] = useState(false); const [copyStatus, setCopyStatus] = useState(''); const [clipboardFailed, setClipboardFailed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false); const [signOutOpen, setSignOutOpen] = useState(false); const [signOutConfirmed, setSignOutConfirmed] = useState(false);
  const [notifications, setNotifications] = useState(loadNotifications); const [notificationsOpen, setNotificationsOpen] = useState(false);
  const profileRef = useRef(null); const profileButtonRef = useRef(null); const shareButtonRef = useRef(null); const copyInputRef = useRef(null); const notificationRef = useRef(null); const notificationButtonRef = useRef(null);
  const navigate = (nextSection) => { setSection(nextSection); setMobileNav(false); };
  const currentUrl = window.location.href;
  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const closeShare = () => { setShareOpen(false); setCopyStatus(''); setClipboardFailed(false); requestAnimationFrame(() => shareButtonRef.current?.focus()); };
  const closeSignOut = () => { setSignOutOpen(false); setSignOutConfirmed(false); requestAnimationFrame(() => profileButtonRef.current?.focus()); };
  const closeNotifications = () => { setNotificationsOpen(false); requestAnimationFrame(() => notificationButtonRef.current?.focus()); };
  const openNotifications = () => {
    setNotificationsOpen((open) => !open);
    setProfileOpen(false);
    setNotifications((current) => current.map((notification) => notification.read ? notification : { ...notification, read: true }));
  };
  const copyLink = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard access is unavailable');
      await navigator.clipboard.writeText(currentUrl);
      setClipboardFailed(false);
      setCopyStatus('Link copied to clipboard.');
    } catch {
      setClipboardFailed(true);
      setCopyStatus('Clipboard access failed. Select the link above and copy it manually.');
      requestAnimationFrame(() => { copyInputRef.current?.focus(); copyInputRef.current?.select(); });
    }
  };
  useEffect(() => {
    if (!profileOpen) return undefined;
    const closeOnOutsideClick = (event) => { if (!profileRef.current?.contains(event.target)) setProfileOpen(false); };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [profileOpen]);
  useEffect(() => {
    try { localStorage.setItem(notificationStorageKey, JSON.stringify(notifications)); } catch { /* Keep notifications usable for this session if storage is unavailable. */ }
  }, [notifications]);
  useEffect(() => {
    if (!notificationsOpen) return undefined;
    const closeOnOutsideClick = (event) => { if (!notificationRef.current?.contains(event.target)) setNotificationsOpen(false); };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [notificationsOpen]);
  useEffect(() => {
    if (!shareOpen && !profileOpen && !signOutOpen && !notificationsOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return;
      if (profileOpen) profileButtonRef.current?.focus();
      setProfileOpen(false);
      if (shareOpen) closeShare();
      if (signOutOpen) closeSignOut();
      if (notificationsOpen) closeNotifications();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [shareOpen, profileOpen, signOutOpen, notificationsOpen]);
  const selected = periods.find(p => p.key === period);
  const ranked = useMemo(() => students.map(s => ({ ...s, points: s[period] })).filter(s => s.name.toLowerCase().includes(search.trim().toLowerCase())).sort((a, b) => b.points - a.points || a.name.localeCompare(b.name)), [period, search]);
  const leaders = ranked.slice(0, 3);
  return <div className="app-shell" id="top"><Sidebar open={mobileNav} section={section} onNavigate={navigate} />{mobileNav && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}<main className="main-content"><header className="topbar"><button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileNav(!mobileNav)}><Menu size={21} /></button><div className="breadcrumb">Workspace <span>/</span> <b>{section}</b></div><div className="topbar-right"><span className="term-chip"><span /> Fall semester 2025</span><div className="notification-anchor" ref={notificationRef}><button ref={notificationButtonRef} type="button" className="icon-button notification" aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications, no unread notifications'} aria-haspopup="dialog" aria-expanded={notificationsOpen} onClick={openNotifications}><Bell size={18} />{unreadCount > 0 && <span className="notification-badge" aria-hidden="true">{unreadCount > 9 ? '9+' : unreadCount}</span>}</button>{notificationsOpen && <section className="notification-panel" role="dialog" aria-label="Notifications" aria-describedby="notification-demo-note"><div className="notification-panel-header"><div><h2>Notifications</h2><span>{unreadCount ? `${unreadCount} unread` : 'All caught up'}</span></div><button type="button" aria-label="Close notifications" onClick={closeNotifications}>×</button></div><p className="notification-demo-note" id="notification-demo-note">Sample notifications for this demo; these are not live updates.</p><div className="notification-list">{notifications.length === 0 ? <div className="notification-empty">No notifications yet.</div> : notifications.map((notification) => <article key={notification.id} className={`notification-item ${notification.read ? 'read' : 'unread'}`}><span className="notification-state" aria-hidden="true" /> <div className="notification-copy"><div className="notification-item-heading"><h3>{notification.title}</h3><span className="notification-status">{notification.read ? 'Read' : 'Unread'}</span></div><p>{notification.message}</p><time>{notification.timestamp}</time></div></article>)}</div></section>}</div><div className="profile-menu-anchor" ref={profileRef}><button ref={profileButtonRef} className="top-profile" type="button" aria-label="Open profile menu" aria-haspopup="menu" aria-expanded={profileOpen} onClick={() => setProfileOpen((open) => !open)}><span className="avatar profile-pic">PS</span><ChevronDown size={15} /></button>{profileOpen && <div className="profile-dropdown" role="menu" aria-label="Profile options"><button role="menuitem" onClick={() => { navigate('View Profile'); setProfileOpen(false); }}>View Profile</button><button role="menuitem" onClick={() => { navigate('Account Settings'); setProfileOpen(false); }}>Account Settings</button><div className="profile-menu-divider" /><button role="menuitem" className="sign-out-option" onClick={() => { setProfileOpen(false); setSignOutConfirmed(false); setSignOutOpen(true); }}>Sign Out</button></div>}</div></div></header><div className="page-wrap" style={{ display: section === 'Leaderboard' ? '' : 'none' }}><section className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> COMMUNITY SPOTLIGHT</div><h1>Leaderboard<span>.</span></h1><p>Celebrating the people who make learning better for everyone.</p></div><button ref={shareButtonRef} className="share-button" onClick={() => { setCopyStatus(''); setClipboardFailed(false); setShareOpen(true); }}><ArrowUpRight size={16} /> Share leaderboard</button></section><section className="hero-banner"><div className="hero-glow" /><div className="hero-copy"><div className="hero-kicker"><Sparkles size={14} /> ONE CAMPUS. COUNTLESS WAYS TO GROW.</div><h2>Learn together.<br /><em>Rise together.</em></h2><p>Every exchange earns points. Every point is progress worth celebrating.</p></div><div className="hero-stat"><div className="stat-icon"><Users size={17} /></div><div><b>1,248</b><span>students learning together</span></div></div><div className="hero-stat"><div className="stat-icon violet"><Zap size={17} /></div><div><b>8,690</b><span>skill swaps this semester</span></div></div><div className="hero-sparkle">✦</div><div className="hero-sparkle s2">✧</div><div className="hero-circles" /></section><div className="board-toolbar"><div className="period-tabs" role="tablist" aria-label="Leaderboard time period">{periods.map(p => <button key={p.key} role="tab" aria-selected={period === p.key} className={period === p.key ? 'selected' : ''} onClick={() => setPeriod(p.key)}>{p.label}</button>)}</div><div className="toolbar-meta"><span className="period-hint"><span className="live-dot" /> {selected.hint}</span><label className="search-box"><Search size={16} /><input aria-label="Search students by name" placeholder="Find a student..." value={search} onChange={e => setSearch(e.target.value)} /><kbd>⌘ K</kbd></label></div></div><section className="leaders-section"><div className="section-title"><div><h2>Top contributors</h2><p>The students sharing their skills and showing up for each other.</p></div><span className="campus-only"><span /> OPC UNIVERSITY</span></div>{leaders.length ? <Podium leaders={leaders} /> : <div className="podium-empty-state">No students match “{search}”. Try another name.</div>}</section><section className="rankings-card"><div className="rankings-heading"><div><h2>All rankings <span className="count-pill">{ranked.length}</span></h2><p>Ranked by points earned · {selected.hint.toLowerCase()}</p></div><button className="sort-label" onClick={() => setPeriod(period)}><span className="sort-indicator">↓</span> Points <ChevronDown size={14} /></button></div>{ranked.length ? <><div className="list-header"><span>RANK</span><span>STUDENT</span><span>SKILLS SHARED</span><span>STREAK</span><span>POINTS</span></div><div className="student-list">{ranked.map((student, index) => <StudentRow key={student.id} student={student} index={index} unit={selected.unit} />)}</div></> : <div className="empty-state"><div className="empty-icon"><Search size={21} /></div><h3>No students found</h3><p>We couldn't find anyone named “{search}”. Check the spelling or try a different name.</p><button onClick={() => setSearch('')}>Clear search</button></div>}<div className="list-footer"><span>Showing <b>{ranked.length ? 1 : 0}–{ranked.length}</b> of <b>{students.length}</b> students</span><span>Points earned through meaningful skill exchanges <span className="footer-sparkle">✦</span></span></div></section><footer className="page-footer"><span>SkillSwap <span>·</span> Learn by teaching. Grow by sharing.</span><span>Made for our campus community <span className="heart">♥</span></span></footer></div><div className="page-wrap section-placeholder" hidden={section === 'Leaderboard'}><h1>{section}</h1><p>This section will be implemented later.</p></div>
      {shareOpen && <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeShare(); }}><section className="simple-dialog" role="dialog" aria-modal="true" aria-labelledby="share-dialog-title"><div className="dialog-heading"><h2 id="share-dialog-title">Share leaderboard</h2><button type="button" className="dialog-close" onClick={closeShare} aria-label="Close share dialog">×</button></div><p className="dialog-description">Copy this link to share the current leaderboard page.</p><label className="share-link-label" htmlFor="leaderboard-share-link">Leaderboard link</label><input ref={copyInputRef} id="leaderboard-share-link" className="share-link-input" value={currentUrl} readOnly onFocus={(event) => event.currentTarget.select()} /><p className={`dialog-status ${clipboardFailed ? 'status-error' : ''}`} aria-live="polite">{copyStatus}</p><div className="dialog-actions"><button type="button" autoFocus className="dialog-primary" onClick={copyLink}>Copy Link</button><button type="button" className="dialog-secondary" onClick={closeShare}>Close</button></div></section></div>}
      {signOutOpen && <div className="dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeSignOut(); }}><section className="simple-dialog signout-dialog" role="dialog" aria-modal="true" aria-labelledby="signout-dialog-title"><h2 id="signout-dialog-title">Sign out?</h2>{signOutConfirmed ? <p className="dialog-description" aria-live="polite">Sign out isn't connected in this demo. You're still signed in, and no data was changed.</p> : <p className="dialog-description">Are you sure you want to sign out? This demo will not clear your account or data.</p>}<div className="dialog-actions"><button type="button" autoFocus className="dialog-secondary" onClick={closeSignOut}>{signOutConfirmed ? 'Close' : 'Cancel'}</button>{!signOutConfirmed && <button type="button" className="dialog-primary" onClick={() => setSignOutConfirmed(true)}>Confirm Sign Out</button>}</div></section></div>}
    </main></div>;
}







