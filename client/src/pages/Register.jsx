
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import BrandPanel from '../components/BrandPanel.jsx';
import { registerUser } from '../api.js';
import { auth, googleProvider } from '../firebase.js';

import '../register.css';

// Everyone registering belongs to our university
const UNIVERSITY_NAME = 'GSFC University';

const ICONS = {
  user: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </>
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <path d="m1 1 22 22" />
    </>
  ),
};

function Svg({ name, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
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

function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
}) {
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
        autoComplete="new-password"
        required
      />

      <button
        type="button"
        className="toggle"
        aria-label={show ? 'Hide password' : 'Show password'}
        onClick={() => setShow(!show)}
      >
        <Svg name={show ? 'eyeOff' : 'eye'} />
      </button>
    </>
  );
}

const DEPARTMENTS = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Mechanical',
  'Civil',
  'Business / Management',
  'Other',
];

const SEMESTERS = [
  '1', '2', '3', '4',
  '5', '6', '7', '8',
];

const INITIAL = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  department: '',
  semester: '',
  terms: false,
};

const API_BASE =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api';

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    if (!form.fullName.trim()) {
      return 'Please enter your full name.';
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      return 'Please enter a valid college email.';
    }

    if (form.password.length < 8) {
      return 'Password must be at least 8 characters.';
    }

    if (form.password !== form.confirmPassword) {
      return 'Passwords do not match.';
    }

    if (!form.department) {
      return 'Please select your department.';
    }

    if (!form.semester) {
      return 'Please select your semester.';
    }

    if (!form.terms) {
      return 'Please accept the Terms & Conditions.';
    }

    return '';
  };

  // NORMAL EMAIL/PASSWORD REGISTRATION
  const onSubmit = async (e) => {
    e.preventDefault();

    const msg = validate();
    setError(msg);

    if (msg) return;

    setLoading(true);

    try {
      await registerUser({
        name: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        university: UNIVERSITY_NAME,
        department: form.department,
        semester: Number(form.semester),
      });

      alert(
        'Account created successfully! Please log in.'
      );

      navigate('/login', { replace: true });
    } catch (err) {
      setError(
        err.message || 'Registration failed.'
      );
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE FIREBASE REGISTRATION / LOGIN
  const onGoogle = async () => {
    setError('');
    setGoogleLoading(true);

    try {
      // Step 1: Open Google account chooser
      const result = await signInWithPopup(
        auth,
        googleProvider
      );

      // Step 2: Get authenticated Google user
      const user = result.user;

      // Step 3: Auto-fill name and email
      setForm((previous) => ({
        ...previous,
        fullName:
          user.displayName || previous.fullName,
        email:
          user.email || previous.email,
      }));

      // Step 4: Get Firebase ID token
      const idToken = await user.getIdToken();

      // Step 5: Verify with SkillSwap backend
      const response = await fetch(
        `${API_BASE}/auth/google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken,
          }),
        }
      );

      // Step 6: Read backend response
      const data = await response.json().catch(
        () => ({})
      );

      if (!response.ok || !data.token) {
        throw new Error(
          data.message ||
          'Google authentication failed.'
        );
      }

      // Step 7: Save backend JWT
      sessionStorage.setItem(
        'skillswap_token',
        data.token
      );

      // Step 8: Save student profile
      if (data.user) {
        sessionStorage.setItem(
          'skillswap_user',
          JSON.stringify(data.user)
        );
      }

      // Step 9: Redirect to Dashboard
      navigate('/dashboard', {
        replace: true,
      });

    } catch (err) {
      if (
        err.code === 'auth/popup-closed-by-user'
      ) {
        return;
      }

      console.error(
        'Google authentication error:',
        err
      );

      setError(
        'Google sign-in failed: ' +
        (
          err.message ||
          err.code ||
          'Unknown error'
        )
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="auth-card">
      <BrandPanel />

      <section className="form-panel">
        <div className="form-wrap">

          <p className="tagline">
            Connect. Learn. Share.
          </p>

          <h1>Create Account</h1>

          <p className="subtitle">
            Your campus community is full of people
            worth learning from.
          </p>

          <form onSubmit={onSubmit} noValidate>

            <div className="row">
              <Field
                label="Full name"
                id="fullName"
                icon="user"
              >
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={onChange}
                  autoComplete="name"
                  required
                />
              </Field>

              <Field
                label="College email"
                id="email"
                icon="mail"
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@college.edu"
                  value={form.email}
                  onChange={onChange}
                  autoComplete="email"
                  required
                />
              </Field>
            </div>

            <div className="row">
              <Field
                label="Password"
                id="password"
                icon="lock"
              >
                <PasswordInput
                  id="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="At least 8 characters"
                />
              </Field>

              <Field
                label="Confirm password"
                id="confirmPassword"
                icon="lock"
              >
                <PasswordInput
                  id="confirmPassword"
                  value={form.confirmPassword}
                  onChange={onChange}
                  placeholder="Re-enter password"
                />
              </Field>
            </div>

            <div className="row">
              <Field
                label="Department"
                id="department"
                icon="building"
              >
                <select
                  id="department"
                  name="department"
                  value={form.department}
                  onChange={onChange}
                  required
                >
                  <option value="" disabled>
                    Select department
                  </option>

                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Semester"
                id="semester"
                icon="calendar"
              >
                <select
                  id="semester"
                  name="semester"
                  value={form.semester}
                  onChange={onChange}
                  required
                >
                  <option value="" disabled>
                    Select semester
                  </option>

                  {SEMESTERS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            {error && (
              <p
                className="error show"
                role="alert"
              >
                {error}
              </p>
            )}

            <label className="terms">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={onChange}
              />

              <span>
                I agree to the{' '}
                <a href="#">
                  Terms &amp; Conditions
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading || googleLoading}
            >
              {loading
                ? 'Creating account...'
                : 'Sign up'}

              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

            <div className="divider">
              OR
            </div>

            <button
              type="button"
              className="btn-google"
              onClick={onGoogle}
              disabled={loading || googleLoading}
            >
              <span className="g">G</span>{' '}
              {googleLoading
                ? 'Connecting to Google...'
                : 'Continue with Google'}
            </button>

            <p className="switch">
              Already have an account?{' '}
              <Link to="/login">
                Log in
              </Link>
            </p>

          </form>
        </div>
      </section>
    </main>
  );
}
