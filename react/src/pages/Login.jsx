import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import BrandPanel from '../components/BrandPanel.jsx';
import { loginUser } from '../api.js';
import { auth, googleProvider } from '../firebase.js';
import '../register.css';

const ICONS = {
  mail: (<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>),
  lock: (<><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>),
  eye: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>),
  eyeOff: (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" /><path d="m1 1 22 22" /></>),
};

function Svg({ name, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

function Field({ label, id, icon, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="control">
        <Svg name={icon} className="ico" />
        {children}
      </div>
    </div>
  );
}

function PasswordInput({ id, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <>
      <input
        id={id}
        name={id}
        type={show ? 'text' : 'password'}
        className="has-toggle"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="current-password"
        required
      />
      <button type="button" className="toggle" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>
        <Svg name={show ? 'eyeOff' : 'eye'} />
      </button>
    </>
  );
}

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Please enter a valid college email.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');

    setError('');
    setLoading(true);
    try {
      const data = await loginUser({ email: form.email, password: form.password });
      (form.remember ? localStorage : sessionStorage).setItem('token', data.token);
      alert('Logged in successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Continue with Google (Firebase) - opens the Google account chooser
  const onGoogle = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem(
        'skillswapUser',
        JSON.stringify({ uid: user.uid, name: user.displayName, email: user.email, photo: user.photoURL })
      );
      alert('Welcome, ' + user.displayName + '!');
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') return;
      setError('Google sign-in failed: ' + err.code);
    }
  };

  return (
    <main className="auth-card">
      <BrandPanel />

      <section className="form-panel login-page">
        <div className="form-wrap">
          <p className="tagline">Connect. Learn. Share.</p>
          <h1>Welcome to SkillSwap</h1>
          <p className="subtitle">Your campus community is full of people worth learning from.</p>

          <form onSubmit={onSubmit} noValidate>
            <Field label="College email" id="email" icon="mail">
              <input id="email" name="email" type="email" placeholder="you@college.edu" value={form.email} onChange={onChange} autoComplete="email" required />
            </Field>

            <Field label="Password" id="password" icon="lock">
              <PasswordInput id="password" value={form.password} onChange={onChange} placeholder="At least 6 characters" />
            </Field>

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" name="remember" checked={form.remember} onChange={onChange} /> Remember me
              </label>
              <a href="#" className="forgot">Forgot password?</a>
            </div>

            {error && <p className="error show" role="alert">{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>

            <div className="divider">OR</div>

            <button type="button" className="btn-google" onClick={onGoogle}>
              <span className="g">G</span> Continue with Google
            </button>

            <p className="switch">Don't have an account? <Link to="/register">Sign up</Link></p>
            <p className="demo">Demo access: student@skillswap.edu · password: skillswap</p>
          </form>
        </div>
      </section>
    </main>
  );
}