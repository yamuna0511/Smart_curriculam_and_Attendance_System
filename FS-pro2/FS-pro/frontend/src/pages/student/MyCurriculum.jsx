import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { BookOpen } from 'lucide-react';

const MyCurriculum = () => {
    const [curriculum, setCurriculum] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/student/curriculum').then(res => {
            setCurriculum(res.data);
        });
    }, []);

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>My Curriculum</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Track your syllabus progress.</p>
                </header>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {curriculum.length === 0 ? <div className="card">No curriculum data found for your parameters.</div> : 
                    curriculum.map(c => (
                        <div key={c._id} className="card animate-fade-in">
                            <h2>{c.subject}</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Semester: {c.semester}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {c.topics.map((t, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid', borderColor: t.isCompleted ? 'var(--secondary)' : 'var(--border)', background: t.isCompleted ? 'var(--secondary)' : 'transparent' }}></div>
                                        <span style={{ textDecoration: t.isCompleted ? 'line-through' : 'none', color: t.isCompleted ? 'var(--text-muted)' : 'var(--text-main)' }}>{t.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
export default MyCurriculum;
