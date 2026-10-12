import React, { useState } from 'react';
import {
  LayoutDashboard, UsersRound, Repeat2, FileText, Building2,
  Flag, Coins, CalendarDays, Settings, LogOut, Bell, Search,
  Menu, X, Download, Check, Clock3, ChevronRight,
  CircleHelp, ShieldCheck, MoreHorizontal, Activity, SlidersHorizontal
} from 'lucide-react';

const initialNotes = [
  { id: 1, title: 'Data Structures & Algorithms', file: 'DSA_Notes_Unit_1-5.pdf', author: 'Rahul Patel', initials: 'RP', date: 'Today, 10:42 AM', size: '8.4 MB', subject: 'Computer Science', tone: 'lavender' },
  { id: 2, title: 'Operating Systems', file: 'Operating_Systems_Notes.pdf', author: 'Ananya Desai', initials: 'AD', date: 'Today, 9:18 AM', size: '5.2 MB', subject: 'Computer Science', tone: 'mint' },
  { id: 3, title: 'Database Management Systems', file: 'DBMS_Complete_Notes.pdf', author: 'Mohit Solanki', initials: 'MS', date: 'Yesterday, 4:06 PM', size: '6.7 MB', subject: 'Information Technology', tone: 'peach' },
  { id: 4, title: 'Computer Networks', file: 'Computer_Networks_PYQs.pdf', author: 'Priya Mehta', initials: 'PM', date: 'Yesterday, 1:30 PM', size: '3.1 MB', subject: 'Computer Science', tone: 'blue' },
];

const reportCategories = [
  { label: 'Inappropriate Content', count: 5, icon: ShieldCheck, color: 'violet' },
  { label: 'Spam Users', count: 3, icon: UsersRound, color: 'amber' },
  { label: 'Other Reports', count: 8, icon: CircleHelp, color: 'rose' },
  { label: 'Swap Disputes', count: 2, icon: Repeat2, color: 'blue' },
  { label: 'Impersonation', count: 1, icon: Flag, color: 'green' },
];
const initialReportItems = [
  { id: 1, title: 'Unverified study guide', category: 'Inappropriate Content', reporter: 'Nisha Rao', target: 'DBMS Unit 3 Notes', status: 'Open' },
  { id: 2, title: 'Repeated promotional messages', category: 'Spam Users', reporter: 'Kabir Shah', target: 'Member profile', status: 'Open' },
  { id: 3, title: 'Session did not take place', category: 'Swap Disputes', reporter: 'Meera Joshi', target: 'Python fundamentals swap', status: 'Open' },
  { id: 4, title: 'Copied resource attribution', category: 'Inappropriate Content', reporter: 'Riya Patel', target: 'Operating Systems notes', status: 'Open' },
  { id: 5, title: 'Profile identity concern', category: 'Impersonation', reporter: 'Dev Malhotra', target: 'Member profile', status: 'Open' },
];
const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Users', icon: UsersRound, badge: '12.5k' },
  { label: 'Skill Swaps', icon: Repeat2 },
  { label: 'Notes', icon: FileText, badge: '6' },
  { label: 'Universities', icon: Building2 },
  { label: 'Reports', icon: Flag, badge: '16' },
  { label: 'Coin Management', icon: Coins },
  { label: 'Events', icon: CalendarDays },
];

function Sidebar({ open, onClose, active, onNavigate, badgeCounts }) {
  return (
    <>
      {open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <button className="brand" aria-label="SkillSwap admin home" onClick={() => onNavigate('Dashboard')}>
          <span className="brand-mark"><Repeat2 size={21} strokeWidth={2.5} /></span>
          <span>Skill<span>Swap</span><small>ADMIN CONSOLE</small></span>
        </button>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="sidebar-nav" aria-label="Admin navigation">
          {navigation.map(({ label, icon: Icon, badge }) => { const displayBadge = badgeCounts[label] ?? badge; return (
            <button key={label} className={`nav-item ${active === label ? 'nav-item--active' : ''}`} aria-current={active === label ? 'page' : undefined} onClick={() => onNavigate(label)}>
              <Icon size={18} strokeWidth={1.9} /><span>{label}</span>{displayBadge !== undefined && <span className="nav-badge">{displayBadge}</span>}
            </button>
          ); })}
        </nav>
        <div className="sidebar-bottom">
          <button className={`nav-item ${active === 'Settings' ? 'nav-item--active' : ''}`} aria-current={active === 'Settings' ? 'page' : undefined} onClick={() => onNavigate('Settings')}><Settings size={18} /><span>Settings</span></button>
          <div className="sidebar-divider" />
          <div className="admin-profile"><div className="profile-avatar">JS</div><div className="profile-copy"><strong>Jordan Smith</strong><small>Super Admin</small></div><button className="more-button" aria-label="More account options" onClick={() => onNavigate('Account options')}><MoreHorizontal size={18} /></button></div>
          <button className="nav-item logout" onClick={() => onNavigate('Log out')}><LogOut size={18} /><span>Log out</span></button>
        </div>
      </aside>
    </>
  );
}

function StatCard({ label, value, change, icon: Icon, color }) {
  return (
    <article className={`stat-card stat-card--${color}`}>
      <div className="stat-card-top"><span>{label}</span><span className="stat-icon"><Icon size={19} strokeWidth={2} /></span></div>
      <div className="stat-value">{value}</div>
      <div className="stat-change"><span className="change-arrow">↗</span>{change}<span className="change-period"> vs. last month</span></div>
    </article>
  );
}

function NoteRow({ note, onApprove, onReject }) {
  return (
    <div className="note-row">
      <div className="note-detail"><div className={`file-icon file-icon--${note.tone}`}><FileText size={19} /></div><div className="note-main"><strong>{note.title}</strong><span>{note.file}</span></div></div>
      <div className="note-author"><div className="author-avatar">{note.initials}</div><div><strong>{note.author}</strong><span>{note.subject}</span></div></div>
      <div className="note-date"><strong>{note.date.split(',')[0]}</strong><span>{note.date.split(',').slice(1).join(',').trim()}</span></div>
      <span className="file-size">{note.size}</span>
      <div className="note-actions"><button className="action-approve" onClick={() => onApprove(note.id)}><Check size={14} />Approve</button><button className="action-reject" onClick={() => onReject(note.id)}><X size={14} />Reject</button></div>
    </div>
  );
}

function ReviewedNotes({ notes }) {
  if (!notes.length) return null;
  return (
    <div className="reviewed-notes" aria-live="polite">
      <h4>Recently reviewed</h4>
      {notes.map(({ note, status }) => <div className="reviewed-note" key={note.id}><span className={`review-status review-status--${status.toLowerCase()}`}>{status}</span><span>{note.title}</span><small>{note.author}</small></div>)}
    </div>
  );
}

function DataTable({ columns, rows, emptyText = 'No matching sample records.', onAction }) {
  if (!rows.length) return <div className="empty-state"><Activity size={23} /><strong>{emptyText}</strong><span>Change the search or filter to see more records.</span></div>;
  return (
    <div className="data-table-wrap"><table className="data-table"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}{rows.some((row) => row.actionLabel) && <th>Action</th>}</tr></thead>
      <tbody>{rows.map((row) => <tr key={row.id}>{row.values.map((value, index) => <td data-label={columns[index]} key={`${row.id}-${columns[index]}`}>{value}</td>)}{row.actionLabel && <td data-label="Action"><button className="table-action" disabled={row.actionDisabled} onClick={() => onAction?.(row)}>{row.actionLabel}</button></td>}</tr>)}</tbody>
    </table></div>
  );
}

function PageHeading({ title, description, action }) {
  return <section className="subpage-heading"><div><p className="welcome-kicker">ADMIN WORKSPACE</p><h2>{title}</h2><p className="welcome-subtitle">{description}</p></div>{action}</section>;
}

function App() {
  const [notes, setNotes] = useState(initialNotes);
  const [reviewedNotes, setReviewedNotes] = useState([]);
  const [reports, setReports] = useState(initialReportItems);
  const [users, setUsers] = useState([
    { id: 1, name: 'Aarav Mehta', email: 'aarav.m@example.edu', course: 'Computer Science', status: 'Active', joined: 'Oct 10, 2026' },
    { id: 2, name: 'Nisha Rao', email: 'nisha.r@example.edu', course: 'Information Technology', status: 'Active', joined: 'Oct 09, 2026' },
    { id: 3, name: 'Kabir Shah', email: 'kabir.s@example.edu', course: 'Design', status: 'Review', joined: 'Oct 07, 2026' },
  ]);
  const [swaps, setSwaps] = useState([
    { id: 1, topic: 'Python fundamentals', members: 'Aisha Kapoor ↔ Rohan Mehta', status: 'In progress' },
    { id: 2, topic: 'Figma basics', members: 'Priya Shah ↔ Sana Khan', status: 'Pending match' },
    { id: 3, topic: 'Academic writing', members: 'Mohit Solanki ↔ Aisha Kapoor', status: 'Scheduled' },
  ]);
  const [events, setEvents] = useState([
    { id: 1, title: 'Peer Learning Meetup', date: 'Oct 18, 2026', location: 'North Hall', status: 'Upcoming' },
    { id: 2, title: 'Design Skills Exchange', date: 'Oct 21, 2026', location: 'Studio 2', status: 'Upcoming' },
    { id: 3, title: 'Study Group Week', date: 'Oct 01, 2026', location: 'Online', status: 'Completed' },
  ]);
  const [transactions, setTransactions] = useState([
    { id: 1, member: 'Aisha Kapoor', reason: 'Session completed', date: 'Oct 11, 2026', amount: '+40' },
    { id: 2, member: 'Rohan Mehta', reason: 'Verified notes contribution', date: 'Oct 10, 2026', amount: '+20' },
    { id: 3, member: 'Priya Shah', reason: 'Welcome bonus', date: 'Oct 09, 2026', amount: '+50' },
  ]);
  const [coinBalance, setCoinBalance] = useState(240);
  const [reportsExpanded, setReportsExpanded] = useState(false);
  const [active, setActive] = useState('Dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');
  const [unread, setUnread] = useState(true);
  const [reportFilter, setReportFilter] = useState('All categories');
  const [userFilter, setUserFilter] = useState('All users');
  const [swapFilter, setSwapFilter] = useState('All swaps');
  const [settings, setSettings] = useState({ notifications: true, weeklyDigest: 'Weekly' });

  function showNotice(message) {
    setNotice(message);
    window.clearTimeout(showNotice.timer);
    showNotice.timer = window.setTimeout(() => setNotice(''), 3000);
  }
  function reviewNote(id, action) {
    const note = notes.find((item) => item.id === id);
    if (!note) return;
    const status = action === 'approve' ? 'Approved' : 'Rejected';
    setNotes((current) => current.filter((item) => item.id !== id));
    setReviewedNotes((current) => [{ note, status }, ...current]);
    showNotice(`“${note.title}” ${status.toLowerCase()}.`);
  }
  function navigate(label, category) {
    if (label === 'Log out') { showNotice('This sample admin console has no active sign-in session.'); return; }
    if (label === 'Account options') { showNotice('Account options are a frontend preview.'); return; }
    if (label === 'Reports') setReportFilter(category || 'All categories');
    setActive(label);
    setMenuOpen(false);
    setSearch('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const query = search.trim().toLowerCase();
  const filterNotes = (items) => items.filter((note) => `${note.title} ${note.file} ${note.author} ${note.subject}`.toLowerCase().includes(query));
  const filteredNotes = filterNotes(notes);
  const filteredReviewedNotes = reviewedNotes.filter(({ note }) => `${note.title} ${note.file} ${note.author} ${note.subject}`.toLowerCase().includes(query));
  const pendingCount = Math.max(6230 - (initialNotes.length - notes.length), 0);
  const visibleReports = reportsExpanded ? reportCategories : reportCategories.slice(0, 3);
  const openReports = reports.filter((report) => report.status === 'Open').length;

  const tablePage = (title, description, columns, rows, options = {}) => {
    const matchingRows = rows.filter((row) => (row.searchable || row.values.map((value) => typeof value === 'string' ? value : '').join(' ')).toLowerCase().includes(query));
    return (
      <>
        <PageHeading title={title} description={description} action={options.action} />
        <section className="panel page-panel">
          <div className="page-panel-heading"><div><h3>{options.panelTitle || title}</h3><p>{matchingRows.length} sample {matchingRows.length === 1 ? 'record' : 'records'}</p></div>{options.filter}</div>
          <DataTable columns={columns} rows={matchingRows} onAction={options.onAction} emptyText={query ? 'No records match that search.' : undefined} />
        </section>
      </>
    );
  };

  function renderPage() {
    if (active === 'Notes') {
      return <>
        <PageHeading title="Notes" description="Review student uploads and see recent decisions." />
        <section className="panel page-panel"><div className="page-panel-heading"><div><h3>Pending uploads</h3><p>{filteredNotes.length} of {notes.length} pending notes</p></div></div>
          <div className="notes-table-labels"><span>NOTE DETAILS</span><span>UPLOADED BY</span><span>SUBMITTED</span><span>SIZE</span><span>ACTIONS</span></div>
          <div className="notes-list">{filteredNotes.length ? filteredNotes.map((note) => <NoteRow key={note.id} note={note} onApprove={(id) => reviewNote(id, 'approve')} onReject={(id) => reviewNote(id, 'reject')} />) : <div className="empty-state"><FileText size={23} /><strong>{search ? 'No notes match that search' : 'All caught up!'}</strong><span>{search ? 'Try a different name, title, or subject.' : 'There are no pending notes to review.'}</span></div>}</div>
          <ReviewedNotes notes={filteredReviewedNotes} />
        </section>
      </>;
    }
    if (active === 'Reports') {
      const rows = reports.filter((report) => reportFilter === 'All categories' || report.category === reportFilter).map((report) => ({ id: report.id, values: [report.title, report.category, report.reporter, report.target, <span className={`status-pill status-pill--${report.status.toLowerCase()}`} key={`status-${report.id}`}>{report.status}</span>], actionLabel: report.status === 'Open' ? 'Mark reviewed' : 'Reviewed', actionDisabled: report.status !== 'Open', searchable: `${report.title} ${report.category} ${report.reporter} ${report.target} ${report.status}` }));
      const matched = rows.filter((row) => (row.searchable || row.values.join(' ')).toLowerCase().includes(query));
      return <>
        <PageHeading title="Reports" description="Review community reports and follow up on sample cases." />
        <section className="panel page-panel"><div className="page-panel-heading"><div><h3>Community reports</h3><p>{openReports} open · {reports.length - openReports} reviewed in this sample</p></div><label className="filter-control"><SlidersHorizontal size={14} /><select value={reportFilter} onChange={(event) => setReportFilter(event.target.value)} aria-label="Filter report category"><option>All categories</option>{reportCategories.map(({ label }) => <option key={label}>{label}</option>)}</select></label></div>
          <DataTable columns={['Report', 'Category', 'Reported by', 'Target', 'Status']} rows={matched} onAction={(row) => { const report = reports.find((item) => item.id === row.id); if (!report) return; setReports((current) => current.map((item) => item.id === row.id ? { ...item, status: 'Reviewed' } : item)); showNotice(`Report “${report.title}” marked reviewed.`); }} emptyText={query ? 'No reports match that search.' : 'No reports in this category.'} />
        </section>
      </>;
    }
    if (active === 'Users') {
      const rows = users.filter((user) => userFilter === 'All users' || (userFilter === 'Active' ? user.status === 'Active' : user.status !== 'Active')).map((user) => ({ id: user.id, values: [user.name, user.email, user.course, <span className={`status-pill status-pill--${user.status.toLowerCase()}`} key={`status-${user.id}`}>{user.status}</span>, user.joined], searchable: `${user.name} ${user.email} ${user.course} ${user.status} ${user.joined}`, actionLabel: user.status === 'Suspended' ? 'Restore' : 'Suspend' }));
      return tablePage('Users', 'Review member accounts across the SkillSwap community.', ['Member', 'Email', 'Study area', 'Status', 'Joined'], rows, { filter: <label className="filter-control"><SlidersHorizontal size={14} /><select value={userFilter} onChange={(event) => setUserFilter(event.target.value)} aria-label="Filter users"><option>All users</option><option>Active</option><option>Needs review</option></select></label>, onAction: (row) => { const user = users.find((item) => item.id === row.id); const next = user.status === 'Suspended' ? 'Active' : 'Suspended'; setUsers((current) => current.map((item) => item.id === row.id ? { ...item, status: next } : item)); showNotice(`${user.name} account marked ${next.toLowerCase()}.`); } });
    }
    if (active === 'Skill Swaps') {
      const rows = swaps.filter((swap) => swapFilter === 'All swaps' || swap.status === swapFilter).map((swap) => ({ id: swap.id, values: [swap.topic, swap.members, <span className={`status-pill status-pill--${swap.status.toLowerCase().replaceAll(' ', '-')}`} key={`status-${swap.id}`}>{swap.status}</span>], searchable: `${swap.topic} ${swap.members} ${swap.status}`, actionLabel: swap.status === 'Completed' ? 'Completed' : 'Complete', actionDisabled: swap.status === 'Completed' }));
      return tablePage('Skill Swaps', 'Track peer-learning requests and scheduled exchanges.', ['Skill exchange', 'Members', 'Status'], rows, { filter: <label className="filter-control"><SlidersHorizontal size={14} /><select value={swapFilter} onChange={(event) => setSwapFilter(event.target.value)} aria-label="Filter swaps"><option>All swaps</option><option>In progress</option><option>Pending match</option><option>Scheduled</option><option>Completed</option></select></label>, onAction: (row) => { const swap = swaps.find((item) => item.id === row.id); if (swap.status === 'Completed') return; setSwaps((current) => current.map((item) => item.id === row.id ? { ...item, status: 'Completed' } : item)); showNotice(`${swap.topic} marked complete.`); } });
    }
    if (active === 'Universities') {
      const rows = [
        { id: 1, values: ['Northstar University', 'Northstar', '8,240', 'Active'], searchable: 'Northstar University Northstar 8240 Active', actionLabel: 'View details' },
        { id: 2, values: ['Westbridge Institute', 'Westbridge', '2,910', 'Active'], searchable: 'Westbridge Institute Westbridge 2910 Active', actionLabel: 'View details' },
        { id: 3, values: ['Cedar Valley College', 'Cedar Valley', '1,410', 'Review'], searchable: 'Cedar Valley College Cedar Valley 1410 Review', actionLabel: 'View details' },
      ];
      return tablePage('Universities', 'Manage participating campuses and their sample membership totals.', ['University', 'Campus', 'Members', 'Status'], rows, { onAction: (row) => showNotice(`${row.values[0]} campus details opened.`) });
    }
    if (active === 'Coin Management') {
      const rows = transactions.map((transaction) => ({ id: transaction.id, values: [transaction.member, transaction.reason, transaction.date, `${transaction.amount} ◈`], searchable: `${transaction.member} ${transaction.reason} ${transaction.date} ${transaction.amount}` }));
      return <>
        <PageHeading title="Coin Management" description="Review sample rewards and member coin activity." action={<button className="primary-action" onClick={() => { const transaction = { id: Date.now(), member: 'Sample member', reason: 'Admin coin grant', date: 'Today', amount: '+20' }; setTransactions((current) => [transaction, ...current]); setCoinBalance((value) => value + 20); showNotice('Added a sample 20 coin grant.'); }}>Grant 20 coins <Coins size={15} /></button>} />
        <section className="panel page-panel"><div className="coin-summary"><span>Sample treasury balance</span><strong>{coinBalance.toLocaleString()} ◈</strong><small>Local preview only</small></div><div className="page-panel-heading"><div><h3>Recent transactions</h3><p>{rows.filter((row) => row.searchable.toLowerCase().includes(query)).length} sample records</p></div></div><DataTable columns={['Member', 'Reason', 'Date', 'Amount']} rows={rows.filter((row) => row.searchable.toLowerCase().includes(query))} /></section>
      </>;
    }
    if (active === 'Events') {
      const rows = events.map((item) => ({ id: item.id, values: [item.title, item.date, item.location, <span className={`status-pill status-pill--${item.status.toLowerCase()}`} key={`status-${item.id}`}>{item.status}</span>], searchable: `${item.title} ${item.date} ${item.location} ${item.status}`, actionLabel: item.status === 'Completed' ? 'Completed' : 'Mark complete', actionDisabled: item.status === 'Completed' }));
      return <>
        <PageHeading title="Events" description="Coordinate sample campus sessions and peer-learning meetups." action={<button className="primary-action" onClick={() => { const item = { id: Date.now(), title: 'New sample meetup', date: 'Oct 28, 2026', location: 'Online', status: 'Upcoming' }; setEvents((current) => [item, ...current]); showNotice('Sample meetup added to the events list.'); }}>Create sample event <CalendarDays size={15} /></button>} />
        <section className="panel page-panel"><div className="page-panel-heading"><div><h3>Campus events</h3><p>{rows.length} sample events</p></div></div><DataTable columns={['Event', 'Date', 'Location', 'Status']} rows={rows.filter((row) => row.searchable.toLowerCase().includes(query))} onAction={(row) => { const event = events.find((item) => item.id === row.id); if (event.status === 'Completed') return; setEvents((current) => current.map((item) => item.id === row.id ? { ...item, status: 'Completed' } : item)); showNotice(`${event.title} marked complete.`); }} /></section>
      </>;
    }
    if (active === 'Settings') {
      const searchableSettings = ['Email notifications', 'Weekly admin digest'].filter((item) => item.toLowerCase().includes(query));
      return <>
        <PageHeading title="Settings" description="Adjust sample preferences for this admin workspace." />
        <section className="panel page-panel settings-panel">{searchableSettings.includes('Email notifications') && <label className="setting-row"><span><strong>Email notifications</strong><small>Receive a sample alert when a new report needs review.</small></span><input type="checkbox" checked={settings.notifications} onChange={(event) => setSettings((current) => ({ ...current, notifications: event.target.checked }))} /></label>}{searchableSettings.includes('Weekly admin digest') && <label className="setting-row"><span><strong>Weekly admin digest</strong><small>Choose how often the sample digest is sent.</small></span><select value={settings.weeklyDigest} onChange={(event) => setSettings((current) => ({ ...current, weeklyDigest: event.target.value }))}><option>Daily</option><option>Weekly</option><option>Off</option></select></label>}{searchableSettings.length === 0 && <div className="empty-state"><strong>No settings match that search.</strong></div>}<p className="sample-note">Settings are stored only in this page session and do not contact a service.</p></section>
      </>;
    }
    return <><PageHeading title={active} description="This is a frontend preview of the selected admin area." /><section className="panel page-panel"><p className="empty-state">Sample admin area ready for your team’s integration.</p></section></>;
  }

  const isDashboard = active === 'Dashboard';
  const searchPlaceholder = isDashboard || active === 'Notes' ? 'Search notes...' : `Search ${active.toLowerCase()}...`;
  return (
    <div className="app-shell">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} active={active} onNavigate={navigate} badgeCounts={{ Notes: Math.max(6 - reviewedNotes.length, 0), Reports: Math.max(16 - (reports.length - openReports), 0) }} />
      <main className="main-area" id="dashboard">
        <header className="topbar">
          <div className="topbar-heading"><button className="mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu size={21} /></button><div><div className="breadcrumb">Admin <ChevronRight size={13} /> <span>{active}</span></div><h1>{isDashboard ? 'Admin Dashboard' : active}</h1></div></div>
          <div className="topbar-actions"><label className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={searchPlaceholder} aria-label={`Search ${searchPlaceholder.replace('Search ', '')}`} /></label><button className="notification-button" aria-label="Notifications" onClick={() => { setUnread(false); showNotice('You’re all caught up on notifications.'); }}><Bell size={19} />{unread && <span className="notification-dot" />}</button><div className="topbar-avatar" aria-label="Jordan Smith">JS</div></div>
        </header>
        <div className="page-content">
          {isDashboard ? <>
            <section className="welcome-row"><div><p className="welcome-kicker">OVERVIEW</p><h2>Welcome back, Jordan <span>✦</span></h2><p className="welcome-subtitle">Here’s what’s happening across your SkillSwap community today.</p></div><div className="date-label"><CalendarDays size={15} /> Sunday, October 11, 2026</div></section>
            <section className="stats-grid" aria-label="Platform summary">
              <StatCard label="Total Users" value="12,560" change="12.8%" icon={UsersRound} color="purple" />
              <StatCard label="Active Swaps" value="8,450" change="8.2%" icon={Repeat2} color="green" />
              <StatCard label="Pending Notes" value={pendingCount.toLocaleString()} change="5.4%" icon={FileText} color="orange" />
              <StatCard label="Total Downloads" value="2.3M" change="18.6%" icon={Download} color="blue" />
            </section>
            <div className="dashboard-grid">
              <section className="panel notes-panel">
                <div className="panel-heading"><div><h3>Recent Notes <span className="heading-muted">(Pending)</span></h3><p>Review the latest student uploads</p></div><button className="view-link" onClick={() => navigate('Notes')}>View all notes <ChevronRight size={15} /></button></div>
                <div className="notes-table-labels"><span>NOTE DETAILS</span><span>UPLOADED BY</span><span>SUBMITTED</span><span>SIZE</span><span>ACTIONS</span></div>
                <div className="notes-list">{filteredNotes.length ? filteredNotes.map((note) => <NoteRow key={note.id} note={note} onApprove={(id) => reviewNote(id, 'approve')} onReject={(id) => reviewNote(id, 'reject')} />) : (search && filteredReviewedNotes.length) ? null : <div className="empty-state"><FileText size={23} /><strong>{search ? 'No notes match that search' : 'All caught up!'}</strong><span>{search ? 'Try a different name, title, or subject.' : 'There are no pending notes to review.'}</span></div>}</div>
                <ReviewedNotes notes={filteredReviewedNotes.slice(0, 3)} />
                <div className="panel-footer"><span><Clock3 size={14} /> Showing {filteredNotes.length} of {notes.length} pending uploads</span><button className="pagination-button" disabled aria-label="Previous notes">‹</button><button className="pagination-current" aria-current="page">1</button><button className="pagination-button" onClick={() => showNotice('All sample notes are shown on this page.')} aria-label="Next notes">›</button></div>
              </section>
              <section className="panel reports-panel">
                <div className="panel-heading"><div><h3>Reports</h3><p>Community items needing review</p></div><span className="reports-total">{reportCategories.slice(0, reportsExpanded ? reportCategories.length : 3).reduce((total, report) => total + report.count, 0)} <small>open</small></span></div>
                <div className="report-list">{visibleReports.map(({ label, count, icon: Icon, color }) => <div className="report-row" key={label}><span className={`report-icon report-icon--${color}`}><Icon size={17} /></span><span className="report-label">{label}</span><span className="report-count">{count}</span><button className="report-open" aria-label={`View ${label} reports`} onClick={() => navigate('Reports', label)}><ChevronRight size={17} /></button></div>)}</div>
                <button className="all-reports-button" onClick={() => setReportsExpanded((value) => !value)}>{reportsExpanded ? 'Show Less' : 'View All Reports'}<ChevronRight size={16} className={reportsExpanded ? 'rotate-icon' : ''} /></button>
              </section>
            </div>
            <footer className="page-footer"><span>© 2026 SkillSwap Admin</span><span>Keeping peer learning safe and thriving.</span></footer>
          </> : renderPage()}
        </div>
      </main>
      <div className={`toast ${notice ? 'toast--visible' : ''}`} role="status" aria-live="polite">{notice}</div>
    </div>
  );
}

export default App;