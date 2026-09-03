const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/userModel');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const email = 'admin@gmail.com';

async function createAdmin() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing from backend/.env');
  }

  await mongoose.connect(process.env.MONGO_URI);

  await User.findOneAndUpdate(
    { email },
    {
      email,
      password: 'zain702',
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