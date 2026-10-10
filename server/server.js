const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: true }));
app.use(express.json());

const users = new Map();

app.get('/api/health', (_req, res) => res.json({ ok: true, message: 'SkillSwap API is running' }));

app.post('/api/register', async (req, res) => {
  const { name, email, password, university, department, semester } = req.body || {};
  if (!name || !email || !password || !university || !department || !semester) {
    return res.status(400).json({ message: 'Please complete all fields.' });
  }
  if (String(password).length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }
  const normalizedEmail = String(email).trim().toLowerCase();
  if (users.has(normalizedEmail)) {
    return res.status(409).json({ message: 'An account with this email already exists.' });
  }
  const passwordHash = await bcrypt.hash(String(password), 10);
  users.set(normalizedEmail, {
    name: String(name).trim(), email: normalizedEmail, passwordHash,
    university, department, semester
  });
  return res.status(201).json({ message: 'Account created successfully. You can now log in.' });
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = users.get(String(email || '').trim().toLowerCase());
  if (!user || !(await bcrypt.compare(String(password || ''), user.passwordHash))) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }
  return res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
});

app.listen(PORT, () => console.log(`SkillSwap API listening at http://localhost:${PORT}`));
