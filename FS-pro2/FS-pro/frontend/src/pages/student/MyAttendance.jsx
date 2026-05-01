import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const MyAttendance = () => {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/student/attendance').then(res => {
            setAttendance(res.data);
        });
    }, []);

    // Calculate percentage
    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'Present').length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>My Attendance</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Review your daily attendance records across all subjects.</p>
                </header>
                
                <div className="card animate-fade-in" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
                    <h2 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Overall Attendance</h2>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: percentage >= 75 ? 'var(--secondary)' : 'var(--danger)' }}>
                        {percentage}%
                    </div>
                </div>

                <div className="card animate-fade-in" style={{ padding: 0, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: 'var(--background)' }}>
                            <tr>
                                <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)' }}>Date</th>
                                <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)' }}>Subject</th>
                                <th style={{ padding: '1rem', borderBottom: '2px solid var(--border)' }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendance.map((record) => (
                                <tr key={record._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{new Date(record.date).toLocaleDateString()}</td>
                                    <td style={{ padding: '1rem', fontWeight: '600' }}>{record.subject}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.4rem 0.8rem', borderRadius: '4px', fontWeight: '600', fontSize: '0.875rem',
                                            background: record.status === 'Present' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: record.status === 'Present' ? 'var(--secondary)' : 'var(--danger)'
                                        }}>
                                            {record.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {attendance.length === 0 && (
                                <tr>
                                    <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No attendance records found yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};
export default MyAttendance;
