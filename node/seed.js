require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillswap');
  const email = 'student@skillswap.edu';
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Demo user already exists: ' + email);
  } else {
    await User.create({
      fullName: 'Demo Student',
      email,
      password: await bcrypt.hash('skillswap', 10),
      university: 'Gujarat Technological University',
      department: 'Computer Science',
      semester: '4',
    });
    console.log('Demo user created -> ' + email + ' / skillswap');
  }
  await mongoose.disconnect();
})().catch((e) => { console.error(e); process.exit(1); });
