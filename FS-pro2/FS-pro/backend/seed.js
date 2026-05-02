const bcrypt = require('bcryptjs');
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
        role: 'Admin'
      });

      console.log("✅ Admin user created");
    } else {
      console.log("✅ Admin already exists");
    }
  } catch (err) {
    console.error(err);
  }
};

createAdmin();