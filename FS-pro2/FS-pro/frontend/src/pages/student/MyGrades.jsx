import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const MyGrades = () => {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyGrades();
    }, []);

    const fetchMyGrades = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/grades/my-grades');
            setGrades(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch grades');
            setLoading(false);
        }
    };

    const getGradeColor = (percentage) => {
        if (percentage >= 90) return 'var(--primary-color)'; // Excellent
        if (percentage >= 75) return '#10b981'; // Good
        if (percentage >= 50) return '#f59e0b'; // Average
        return '#ef4444'; // Poor
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>My Report Card</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Track your academic performance across all subjects.</p>
                </header>

                {loading ? <p>Loading grades...</p> : grades.length === 0 ? (
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <p>No grades have been posted yet.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {grades.map(grade => {
                            const percentage = Math.round((grade.score / grade.total) * 100);
                            const color = getGradeColor(percentage);
                            return (
                                <div key={grade._id} className="card animate-fade-in" style={{ padding: '1.5rem', borderTop: `4px solid ${color}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                        <div>
                                            <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--text-main)' }}>{grade.subject}</h3>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{grade.title}</span>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: color }}>
                                                {percentage}%
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div style={{ background: 'var(--background)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Marks Scored</div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{grade.score}</div>
                                        </div>
                                        <div style={{ borderLeft: '1px solid #ccc' }}></div>
                                        <div style={{ textAlign: 'center' }}>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Marks</div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{grade.total}</div>
                                        </div>
                                    </div>

                                    {grade.remarks && (
                                        <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text-muted)', borderLeft: '2px solid #ccc', paddingLeft: '0.5rem' }}>
                                            "{grade.remarks}"
                                        </p>
                                    )}
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'right' }}>
                                        Graded by: {grade.faculty?.name || 'Faculty'} • {new Date(grade.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyGrades;
