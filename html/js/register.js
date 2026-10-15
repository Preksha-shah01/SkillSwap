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

const form = document.getElementById('registerForm');
const errorEl = document.getElementById('formError');

function showError(msg) {
  errorEl.textContent = msg;
  errorEl.classList.add('show');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  errorEl.classList.remove('show');

  const data = Object.fromEntries(new FormData(form).entries());

  if (!data.fullName.trim()) return showError('Please enter your full name.');
  if (!/^\S+@\S+\.\S+$/.test(data.email)) return showError('Please enter a valid college email.');
  if (data.password.length < 6) return showError('Password must be at least 6 characters.');
  if (data.password !== data.confirmPassword) return showError('Passwords do not match.');
  if (!data.university) return showError('Please select your university.');
  if (!data.department) return showError('Please select your department.');
  if (!data.semester) return showError('Please select your semester.');
  if (!document.getElementById('terms').checked) return showError('Please accept the Terms & Conditions.');

  // TODO: connect to your backend / auth here
  console.log('Register payload:', data);
  alert('Account created! (connect this to your backend)');
});

document.getElementById('googleBtn').addEventListener('click', () => {
  // TODO: connect Google sign-up here
});
