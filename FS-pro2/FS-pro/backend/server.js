const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();

// Middleware
// Updated CORS to be more robust for Vercel
app.use(cors({
  origin: true, // Allows your Vercel frontend to communicate with the backend
  credentials: true
}));
app.use(express.json());

// Database Connection
// We remove the local '127.0.0.1' fallback to ensure it only uses the Vercel MONGO_URI
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