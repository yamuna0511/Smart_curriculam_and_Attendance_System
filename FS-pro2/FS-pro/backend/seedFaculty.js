const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Faculty = require('./models/Faculty');

mongoose.connect('mongodb://127.0.0.1:27017/smart_curriculum')
.then(async () => {
    console.log('Seeding more faculty members and departments...');
    const hash = await bcrypt.hash('password123', 10);
    
    const facultyData = [
        { name: 'Dr. Alan Turing', email: 'alan@test.com', dept: 'CS', subjects: ['Cryptography', 'AI'] },
        { name: 'Dr. Ada Lovelace', email: 'ada@test.com', dept: 'IT', subjects: ['Algorithms', 'Data Structures'] },
        { name: 'Dr. Nikola Tesla', email: 'nikola@test.com', dept: 'EE', subjects: ['Electromagnetism', 'Circuits'] },
        { name: 'Dr. Marie Curie', email: 'marie@test.com', dept: 'Physics', subjects: ['Quantum Mechanics', 'Thermodynamics'] },
        { name: 'Dr. Henry Ford', email: 'henry@test.com', dept: 'Mech', subjects: ['Thermodynamics', 'Fluid Mechanics'] },
        { name: 'Dr. Adam Smith', email: 'adam@test.com', dept: 'Business', subjects: ['Economics', 'Finance'] }
    ];
    
    for (let i = 0; i < facultyData.length; i++) {
        let exists = await User.findOne({ email: facultyData[i].email });
        if (!exists) {
            const u = await User.create({ name: facultyData[i].name, email: facultyData[i].email, password: hash, role: 'Faculty' });
            await Faculty.create({ user: u._id, employeeId: `FAC00${i + 2}`, department: facultyData[i].dept, subjects: facultyData[i].subjects });
            console.log(`Created Faculty: ${facultyData[i].name} (${facultyData[i].dept})`);
        } else {
            console.log(`Faculty ${facultyData[i].email} already exists.`);
        }
    }
    
    console.log('Faculty Seeding Complete!');
    process.exit(0);
})
.catch(err => { console.error(err); process.exit(1); });
