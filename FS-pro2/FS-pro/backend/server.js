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

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});