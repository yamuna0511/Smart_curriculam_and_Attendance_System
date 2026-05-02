require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Student = require('./models/Student');

const seedStudents = async () => {
  try {
    const hash = await bcrypt.hash('password123', 10);

    const studentsData = [
      { name: 'Alice Smith', email: 'alice@test.com' },
      { name: 'Bob Johnson', email: 'bob@test.com' },
      { name: 'Charlie Brown', email: 'charlie@test.com' },
      { name: 'Diana Prince', email: 'diana@test.com' },
      { name: 'Ethan Hunt', email: 'ethan@test.com' },
      { name: 'Fiona Gallagher', email: 'fiona@test.com' },
      { name: 'George Costanza', email: 'george@test.com' },
      { name: 'Hannah Montana', email: 'hannah@test.com' },
      { name: 'Ian Malcolm', email: 'ian@test.com' },
      { name: 'Julia Roberts', email: 'julia@test.com' },
      { name: 'Kevin Hart', email: 'kevin@test.com' },
      { name: 'Laura Dern', email: 'laura@test.com' },
      { name: 'Michael Scott', email: 'michael@test.com' },
      { name: 'Nina Dobrev', email: 'nina@test.com' },
      { name: 'Oscar Isaac', email: 'oscar@test.com' },
      { name: 'Pam Beesly', email: 'pam@test.com' },
      { name: 'Quentin Tarantino', email: 'quentin@test.com' },
      { name: 'Rachel Green', email: 'rachel@test.com' },
      { name: 'Steve Jobs', email: 'steve@test.com' },
      { name: 'Tony Stark', email: 'tony@test.com' }
    ];

    for (let i = 0; i < studentsData.length; i++) {
      let exists = await User.findOne({ email: studentsData[i].email });

      if (!exists) {
        const u = await User.create({
          name: studentsData[i].name,
          email: studentsData[i].email,
          password: hash,
          role: 'student'
        });

        await Student.create({
          user: u._id,
          enrollmentNumber: `STU10${i}`,
          department: 'CS',
          semester: 1
        });

        console.log(`✅ Student created: ${studentsData[i].name}`);
      }
    }

    console.log("✅ Student seeding completed");
  } catch (err) {
    console.error("Student Seed Error:", err.message);
  }
};

module.exports = seedStudents;