const User = require('../models/User');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, extraDetails } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    // Create role-specific data
    if (role === 'Student' && extraDetails) {
      const student = new Student({
        user: user._id,
        ...extraDetails
      });
      await student.save();
    } 
    else if (role === 'Faculty' && extraDetails) {
      const faculty = new Faculty({
        user: user._id,
        ...extraDetails
      });
      await faculty.save();
    }

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ LOGIN (FIXED VERSION)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", email); // Debug log

    // Find user
    const user = await User.findOne({ email });

    // ❌ DO NOT use 404 here
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: '1d' }
    );

    // Send response
    res.status(200).json({
      token,
      role: user.role,
      name: user.name,
      id: user._id
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};