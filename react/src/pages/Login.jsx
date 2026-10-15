import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import BrandPanel from '../components/BrandPanel.jsx';
import { Field, PasswordInput } from '../components/FormParts.jsx';
import { loginUser } from '../api.js';
import { auth, googleProvider } from '../firebase.js';
import '../login.css';

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

  // Continue with Google (Firebase)
  const onGoogle = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider); // opens Google account chooser
      const user = result.user;
      localStorage.setItem(
        'skillswapUser',
        JSON.stringify({ uid: user.uid, name: user.displayName, email: user.email, photo: user.photoURL })
      );
      alert('Welcome, ' + user.displayName + '!');
      // navigate('/dashboard') once you have a dashboard route
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

            <p className="switch">Don't have an account? <a href="http://localhost:5174/register">Sign up</a></p>
            <p className="demo">Demo access: student@skillswap.edu · password: skillswap</p>
          </form>
        </div>
      </section>
    </main>
  );
}