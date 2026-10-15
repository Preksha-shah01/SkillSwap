import { useState } from 'react';

const ICONS = {
  mail: (<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>),
  lock: (<><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>),
  eye: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>),
  eyeOff: (<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" /><path d="m1 1 22 22" /></>),
};

export function Svg({ name, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

export function Field({ label, id, icon, children }) {
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

export function PasswordInput({ id, value, onChange, placeholder, autoComplete = 'current-password' }) {
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
        autoComplete={autoComplete}
        required
      />
      <button type="button" className="toggle" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>
        <Svg name={show ? 'eyeOff' : 'eye'} />
      </button>
    </>
  );
}
