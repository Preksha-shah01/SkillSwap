import React, { useState } from 'react';
import SkillSwapLayout from './layout.jsx';

const API = 'http://localhost:5000/api';
const universities = ['Northstar University', 'City University', 'State Technical University', 'Other'];
const departments = ['Computer Science', 'Information Technology', 'Design', 'Business', 'Engineering', 'Other'];
const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];

function RegistrationPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', university: '', department: '', semester: '', agreed: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState('signup');
  const update = (key, value) => setForm(old => ({ ...old, [key]: value }));

  async function submit(e) {
    e.preventDefault(); setMessage('');
    if (mode === 'signup' && form.password !== form.confirmPassword) return setMessage('Passwords do not match.');
    if (mode === 'signup' && !form.agreed) return setMessage('Please agree to the Terms & Conditions.');
    setBusy(true);
    try {
      const response = await fetch(`${API}/${mode === 'signup' ? 'register' : 'login'}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'signup'
          ? { name: form.name, email: form.email, password: form.password, university: form.university, department: form.department, semester: form.semester }
          : { email: form.email, password: form.password })
      });
      const data = await response.json();
      setMessage(data.message || (response.ok ? 'Success!' : 'Something went wrong.'));
      if (response.ok && mode === 'signup') setMode('login');
    } catch {
      setMessage('Cannot reach the API. Start the Node server in the server folder first.');
    } finally { setBusy(false); }
  }

  return <div className="auth-shell">
    <section className="promo-panel">
      <div className="auth-brand"><div className="brand-mark">☷</div><span>SkillSwap</span></div>
      <div className="promo-copy">
        <p className="eyebrow">MADE FOR CAMPUS</p>
        <h1>Learn. Teach.<br />Swap skills.</h1>
        <p className="promo-description">Turn what you know into what you want to learn—one student connection at a time.</p>
      </div>
      <div className="exchange-illustration">
        <span className="skill-tag tag-python">Python →</span>
        <span className="skill-tag tag-ui">UI/UX</span>
        <span className="skill-caption caption-python">Python</span>
        <span className="skill-caption caption-ui">UI/UX</span>
        <div className="exchange-line line-top"></div>
        <div className="exchange-line line-bottom"></div>
        <div className="circle-icon book-icon"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 14c-5-5-12-4-16-2v22c5-2 11-3 16 2m0-22c5-5 12-4 16-2v22c-5-2-11-3-16 2m0-22v22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
        <div className="circle-icon people-icon"><svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="18" cy="17" r="7" fill="none" stroke="currentColor" strokeWidth="2.4"/><path d="M5 37c0-7 5-12 13-12s13 5 13 12M31 12a6 6 0 0 1 0 12m3 2c5 1 8 5 9 10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/></svg></div>
        <span className="person-badge badge-a">A</span>
        <span className="person-badge badge-b">B</span>
        <span className="arrow-left">←</span>
        <span className="arrow-right">→</span>
        <span className="skill-tag tag-react">React</span>
        <span className="skill-tag tag-aiml">AI/ML</span>
      </div>
      <p className="promo-foot"><span className="check-mark">✓</span> Built around what students can share</p>
    </section>
    <section className="form-panel">
      <div className="form-wrap">
        <p className="purple-kicker">Connect. Learn. Share.</p>
        <h2>{mode === 'signup' ? 'Create Account' : 'Welcome back'}</h2>
        <p className="form-subtitle">{mode === 'signup' ? 'Your campus community is full of people worth learning from.' : 'Log in to continue your SkillSwap journey.'}</p>
        <form onSubmit={submit}>
          {mode === 'signup' && <div className="field"><label htmlFor="name">Full name</label><input id="name" required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" /></div>}
          <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" required value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@college.edu" /></div>
          <div className="field"><label htmlFor="password">Password</label><div className="password-box"><input id="password" type={showPassword ? 'text' : 'password'} minLength="6" required value={form.password} onChange={e => update('password', e.target.value)} placeholder="At least 6 characters" /><button type="button" className="show-btn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></div></div>
          {mode === 'signup' && <div className="field"><label htmlFor="confirm">Confirm password</label><div className="password-box"><input id="confirm" type={showConfirm ? 'text' : 'password'} required value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} placeholder="Re-enter password" /><button type="button" className="show-btn" onClick={() => setShowConfirm(!showConfirm)}>{showConfirm ? 'Hide' : 'Show'}</button></div></div>}
          {mode === 'signup' && <>
            <div className="field full"><label htmlFor="university">University</label><select id="university" required value={form.university} onChange={e => update('university', e.target.value)}><option value="">Select university</option>{universities.map(x => <option key={x}>{x}</option>)}</select></div>
            <div className="field"><label htmlFor="department">Department</label><select id="department" required value={form.department} onChange={e => update('department', e.target.value)}><option value="">Select department</option>{departments.map(x => <option key={x}>{x}</option>)}</select></div>
            <div className="field"><label htmlFor="semester">Semester</label><select id="semester" required value={form.semester} onChange={e => update('semester', e.target.value)}><option value="">Select semester</option>{semesters.map(x => <option key={x}>{x}</option>)}</select></div>
            <label className="terms"><input type="checkbox" checked={form.agreed} onChange={e => update('agreed', e.target.checked)} /><span>I agree to the <strong>Terms &amp; Conditions</strong></span></label>
          </>}
          {message && <p className={message.toLowerCase().includes('success') || message.toLowerCase().includes('created') || message.toLowerCase().includes('login successful') ? 'notice success' : 'notice'} role="status">{message}</p>}
          <button className="submit-btn" disabled={busy}>{busy ? 'Please wait…' : mode === 'signup' ? 'Sign up →' : 'Log in →'}</button>
        </form>
        <p className="switch-mode">{mode === 'signup' ? 'Already have an account?' : 'New to SkillSwap?'} <button type="button" onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setMessage(''); }}>{mode === 'signup' ? 'Log in' : 'Create account'}</button></p>
      </div>
    </section>
  </div>;
}

function DashboardDemo() {
  return <SkillSwapLayout><div className="dashboard-welcome"><p className="purple-kicker">YOUR CAMPUS WORKSPACE</p><h1>Welcome to SkillSwap</h1><p>Discover skills, share what you know, and learn with your campus community.</p><div className="dashboard-cards"><article><span>⇄</span><h3>Skill Exchange</h3><p>Find a learning partner and trade skills.</p></article><article><span>▤</span><h3>Knowledge Hub</h3><p>Save and share notes with students.</p></article><article><span>☆</span><h3>Community</h3><p>Meet people who share your interests.</p></article></div><button className="submit-btn dashboard-back" onClick={() => window.location.hash = ''}>Back to sign up</button></div></SkillSwapLayout>;
}

export default function App() {
  const [dashboard, setDashboard] = useState(window.location.hash === '#dashboard');
  React.useEffect(() => {
    const handle = () => setDashboard(window.location.hash === '#dashboard');
    window.addEventListener('hashchange', handle);
    return () => window.removeEventListener('hashchange', handle);
  }, []);
  return dashboard ? <DashboardDemo /> : <RegistrationPage />;
}
