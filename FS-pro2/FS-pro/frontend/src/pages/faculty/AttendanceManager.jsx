import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const AttendanceManager = () => {
    const [students, setStudents] = useState([]);
    const [subject, setSubject] = useState('Computer Science 101');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [message, setMessage] = useState('');
    const [department, setDepartment] = useState('CS');
    const [semester, setSemester] = useState(1);
    const [loading, setLoading] = useState(false);

    const departments = ['CS', 'IT', 'EE', 'ME', 'CE'];
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

    const loadStudents = async () => {
        if (!department || !semester) return;
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        setLoading(true);
        try {
            const res = await axios.get(
                `http://localhost:5000/api/faculty/students?department=${department}&semester=${semester}`,
                { headers }
            );
            setStudents(res.data);
        } catch (err) {
            console.error(err);
            setStudents([]);
            const serverMsg = err.response?.data?.message || err.response?.data?.error || err.message;
            alert(`Unable to fetch students for the selected department and semester. ${serverMsg}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStudents();
    }, []);

    const markAttendance = async (studentId, status) => {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        try {
            await axios.post(
                'http://localhost:5000/api/faculty/attendance',
                { studentId, subject, date, status },
                { headers }
            );
            setMessage(`Saved ${status} successfully!`);
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            const serverMsg = err.response?.data?.message || err.message;
            alert('Error marking attendance: ' + serverMsg);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Attendance Roster</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Select a student and record their daily presence.</p>
                </header>
                <div className="card animate-fade-in" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1.5rem', background: 'var(--surface)' }}>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        Department
                        <select value={department} onChange={(e) => setDepartment(e.target.value)} className="input-field" style={{ width: '200px' }}>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </label>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        Semester
                        <select value={semester} onChange={(e) => setSemester(Number(e.target.value))} className="input-field" style={{ width: '120px' }}>
                            {semesters.map((sem) => (
                                <option key={sem} value={sem}>{sem}</option>
                            ))}
                        </select>
                    </label>
                    <button className="btn btn-primary" type="button" onClick={loadStudents} style={{ height: '40px' }}>Load Students</button>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" style={{ width: 'auto' }} />
                    <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-field" placeholder="Subject Name" style={{ width: 'auto' }} />
                    {message && <span style={{ color: 'var(--secondary)', fontWeight: '600' }}>{message}</span>}
                </div>
                <div className="card animate-fade-in" style={{ padding: 0, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: 'var(--background)' }}>
                            <tr>
                                <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)' }}>Student Name</th>
                                <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)' }}>Roll Number</th>
                                <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)' }}>Dept Details</th>
                                <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s, idx) => (
                                <tr key={s._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ fontWeight: '600' }}>{s.user?.name || 'Unknown'}</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{s.user?.email || 'N/A'}</div>
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{s.enrollmentNumber}</td>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{s.department} (Sem {s.semester})</td>
                                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                                        <button className="btn" style={{ background: 'var(--secondary)', color: 'white', marginRight: '0.5rem', padding: '0.5rem 1rem' }} onClick={() => markAttendance(s._id, 'Present')}>Present</button>
                                        <button className="btn btn-danger" style={{ padding: '0.5rem 1rem' }} onClick={() => markAttendance(s._id, 'Absent')}>Absent</button>
                                    </td>
                                </tr>
                            ))}
                            {students.length === 0 && (
                                <tr>
                                    <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No students found for {department} Semester {semester}. Please select the department and semester and click Load Students.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};
export default AttendanceManager;
