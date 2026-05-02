require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    const existing = await User.findOne({ email: 'admin@test.com' });

    if (!existing) {
      const hash = await bcrypt.hash('password123', 10);

      await User.create({
        name: 'Admin',
        email: 'admin@test.com',
        password: hash,
        role: 'admin'
      });

      console.log("✅ Admin user created");
    } else {
      console.log("✅ Admin already exists");
    }
  } catch (err) {
    console.error("Admin Seed Error:", err.message);
  }
};

module.exports = createAdmin;