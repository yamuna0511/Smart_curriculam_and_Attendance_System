const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();

// Middleware
// Updated CORS to explicitly allow your Vercel frontend URL
// Updated CORS to allow all Vercel deployments for your project
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl) 
    // or origins that match your Vercel project domain
    if (!origin || origin.includes("vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Database Connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
.then(() => console.log('MongoDB Connected successfully to Atlas'))
.catch(err => {
    console.error('MongoDB Connection Error Details:');
    console.error(err);
});

// Routes
app.use('/api', apiRoutes);

// Root route for testing if the backend is alive
app.get("/", (req, res) => res.send("Smart Campus Server is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));