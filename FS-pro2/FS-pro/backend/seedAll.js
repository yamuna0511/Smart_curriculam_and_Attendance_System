require('dotenv').config();
const mongoose = require('mongoose');

const seedAdmin = require('./seed');
const seedFaculty = require('./seedFaculty');
const seedStudents = require('./seedCohort');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    await seedAdmin();
    await seedFaculty();
    await seedStudents();

    console.log("🎉 ALL SEEDING COMPLETED");
    process.exit(0);
  })
  .catch(err => {
    console.error("DB Connection Error:", err.message);
    process.exit(1);
  });