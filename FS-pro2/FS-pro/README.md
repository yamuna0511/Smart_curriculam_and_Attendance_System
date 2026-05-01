# Smart Curriculum Activity & Attendance App (SIH25011)

## Overview
This is the complete working prototype for the SIH25011 problem statement. It provides a full-stack, comprehensive web platform designed for educational institutions to digitally supervise, track, and manage attendance along with advanced curriculum syllabus progression.

## Tech Stack
- **Frontend**: React.js, Vite, HTML5, Vanilla Modern CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose
- **Authentication**: JWT (JSON Web Tokens) with secure `bcryptjs` hashing

## Key Modules Implemented
1. **Authentication System (Role Based)**
   - Secure Login ecosystem with customized protected routes ensuring boundaries between Admin, Faculty, and Student environments.
2. **Admin Dashboard**
   - System control to view and permanently remove unverified users. 
   - High-level data visualization showing Institution totals.
3. **Faculty Dashboard**
   - Advanced attendance management matrix for entire cohorts.
   - Granular curriculum mapping (topic tracking and semester completion toggles).
   - Assignment framework to distribute tasks to students directly.
4. **Student Dashboard**
   - Personal attendance monitor showing exact percentages.
   - Real-time syllabus and deadline tracking.
   - Pending assignments and dynamic UI cards.

## Execution Guide
### Prerequisites
- Node.js (v16+) installed.
- MongoDB Server running locally on port `27017`

### Setup Instructions
1. **Backend Initialization**
   ```bash
   cd backend
   npm install
   node seed.js # (Instantiates the Database with default models)
   node server.js
   ```
2. **Frontend Initialization**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Default Demo Credentials (from `seed.js`)
- **Admin:** `admin@test.com` | `password123`
- **Faculty:** `faculty@test.com` | `password123`
- **Student:** `student@test.com` | `password123`
