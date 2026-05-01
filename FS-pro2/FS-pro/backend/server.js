const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

dotenv.config();

const app = express();

// Middleware
// Updated CORS to explicitly allow your Vercel frontend URL
app.use(cors({
  origin: [
    "https://smart-curriculam-and-attendance-system-psrgt1dwh.vercel.app",
    "https://smart-curriculam-and-attendance-sys.vercel.app"
  ],
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