// Change this if your Node server runs on a different URL/port
const API_URL = 'http://localhost:5000/api';

// Eye icons for show/hide password (same as login page)
const EYE = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF = '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 19c-6.5 0-10-7-10-7a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><path d="m1 1 22 22"/></svg>';

document.querySelectorAll('.toggle').forEach(btn => {
  btn.innerHTML = EYE;
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    btn.innerHTML = show ? EYE_OFF : EYE;
    btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });
});

const form = document.getElementById('loginForm');
const errorEl = document.getElementById('formError');
const loginBtn = document.getElementById('loginBtn');

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.add('show');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  errorEl.classList.remove('show');

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const remember = document.getElementById('remember').checked;

  if (!/^\S+@\S+\.\S+$/.test(email)) return showError('Please enter a valid college email.');
  if (password.length < 6) return showError('Password must be at least 6 characters.');

  loginBtn.disabled = true;
  fetch(API_URL + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then((r) => r.json().then((j) => ({ ok: r.ok, j })))
    .then(({ ok, j }) => {
      if (!ok) return showError(j.message || 'Login failed');
      (remember ? localStorage : sessionStorage).setItem('token', j.token);
      alert('Logged in successfully!');
      // window.location.href = 'dashboard.html';
    })
    .catch(() => showError('Cannot reach the server. Is the backend running?'))
    .finally(() => { loginBtn.disabled = false; });
});