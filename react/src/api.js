// Change this if your Node server runs on a different URL/port
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function registerUser(payload) {
  const res = await fetch(API_URL + '/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
}
