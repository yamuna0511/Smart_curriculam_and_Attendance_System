const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Student = require('./models/Student');
const Faculty = require('./models/Faculty');

mongoose.connect('mongodb://127.0.0.1:27017/smart_curriculum')
.then(async () => {
    console.log('Connected to DB for Seeding...');
    
    const hash = await bcrypt.hash('password123', 10);
    
    // Create Admin if not exists
    let admin = await User.findOne({ email: 'admin@test.com' });
    if (!admin) {
        await User.create({ name: 'Admin User', email: 'admin@test.com', password: hash, role: 'Admin' });
        console.log('Created Admin User: admin@test.com');
    }
    
    // Create Faculty if not exists
    let faculty = await User.findOne({ email: 'faculty@test.com' });
    if (!faculty) {
        const fUser = await User.create({ name: 'Jane Faculty', email: 'faculty@test.com', password: hash, role: 'Faculty' });
        await Faculty.create({ user: fUser._id, employeeId: 'FAC001', department: 'CS', subjects: ['Math', 'Coding'] });
        console.log('Created Faculty User: faculty@test.com');
    }
    
    // Departments and semesters
    const departments = ['CS', 'IT', 'EE', 'ME', 'CE'];
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
    
    // Ensure at least one student per department/semester combination
    for (const department of departments) {
        for (const semester of semesters) {
            const email = `student_${department}${semester}@test.com`;
            const enrollmentNumber = `STU${department}${semester}`;
            let studentUser = await User.findOne({ email });
            if (!studentUser) {
                studentUser = await User.create({
                    name: `Student ${department}${semester}`,
                    email,
                    password: hash,
                    role: 'Student'
                });
            }
            let studentRecord = await Student.findOne({ enrollmentNumber });
            if (!studentRecord) {
                await Student.create({
                    user: studentUser._id,
                    enrollmentNumber,
                    department,
                    semester
                });
                console.log(`Created Student: ${email} - Dept: ${department}, Sem: ${semester}`);
            } else {
                console.log(`Student record exists: ${enrollmentNumber}`);
            }
        }
    }
    
    console.log('Seed Complete!');
    process.exit(0);
})
.catch(err => { console.error(err); process.exit(1); });
