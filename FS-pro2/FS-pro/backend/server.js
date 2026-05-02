const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// ✅ MongoDB Connection (IMPROVED)
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected successfully to Atlas");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:");
    console.error(err.message);
    process.exit(1);
  }
};


connectDB();

// ✅ Routes
app.use('/api', apiRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Smart Campus Server is running");
});
\const createUsers = async () => {
  const bcrypt = require('bcryptjs');
  const User = require('./models/User');
  const Student = require('./models/Student');
  const Faculty = require('./models/Faculty');

  const hash = await bcrypt.hash('password123', 10);

  // ✅ Admin
  if (!(await User.findOne({ email: 'admin@test.com' }))) {
    await User.create({
      name: 'Admin',
      email: 'admin@test.com',
      password: hash,
      role: 'Admin'
    });
    console.log("✅ Admin created");
  }

  // ✅ Faculty
  let facultyUser = await User.findOne({ email: 'faculty@test.com' });
  if (!facultyUser) {
    facultyUser = await User.create({
      name: 'Faculty User',
      email: 'faculty@test.com',
      password: hash,
      role: 'Faculty'
    });

    await Faculty.create({
      user: facultyUser._id,
      employeeId: 'FAC001',
      department: 'CS',
      subjects: ['Math', 'Programming']
    });

    console.log("✅ Faculty created");
  }

  // ✅ Student
  let studentUser = await User.findOne({ email: 'student_CS1@test.com' });
  if (!studentUser) {
    studentUser = await User.create({
      name: 'Student_CS1',
      email: 'student_CS1@test.com',
      password: hash,
      role: 'Student'
    });

    await Student.create({
      user: studentUser._id,
      enrollmentNumber: 'STU001',
      department: 'CS',
      semester: 1
    });

    console.log("✅ Student created");
  }
};

createUsers();

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});