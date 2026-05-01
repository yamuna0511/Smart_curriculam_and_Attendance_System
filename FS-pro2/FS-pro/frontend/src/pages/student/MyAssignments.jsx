import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { Calendar } from 'lucide-react';

const MyAssignments = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/student/assignments').then(res => {
            setAssignments(res.data);
        });
    }, []);

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>My Assignments</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Here are your active assignments.</p>
                </header>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {assignments.length === 0 ? <div className="card">No assignments pending.</div> : 
                    assignments.map(a => (
                        <div key={a._id} className="card animate-fade-in">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={20} color="var(--primary)"/> {a.title}</h3>
                            <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0' }}>{a.subject}</p>
                            <p>{a.description}</p>
                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', fontSize: '0.875rem' }}>
                                Due: {new Date(a.dueDate).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
export default MyAssignments;
