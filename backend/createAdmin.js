const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/userModel');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const email = 'admin@gmail.com';

async function createAdmin() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing from backend/.env');
  }
  if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 12) {
    throw new Error('ADMIN_PASSWORD must be set in backend/.env and contain at least 12 characters');
  }

  await mongoose.connect(process.env.MONGO_URI);

  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

  await User.findOneAndUpdate(
    { email },
    {
      email,
      password,
      name: 'Admin',
      role: 'admin'
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`Admin account ready: ${email}`);
}

createAdmin()
  .catch((error) => {
    console.error('Admin creation failed:', error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());