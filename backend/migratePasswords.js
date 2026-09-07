const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
const User = require('./models/userModel');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const isBcryptHash = (password) => /^\$2[aby]?\$\d{2}\$/.test(password);

async function migratePasswords() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is missing from backend/.env');

  await mongoose.connect(process.env.MONGO_URI);
  const users = await User.find({}).select('+password');
  let migrated = 0;

  for (const user of users) {
    if (isBcryptHash(user.password)) continue;
    user.password = await bcrypt.hash(user.password, 12);
    await user.save();
    migrated += 1;
  }

  console.log(`Password migration complete. Hashed ${migrated} account(s).`);
}

migratePasswords()
  .catch((error) => {
    console.error('Password migration failed:', error.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
