import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const MyTimetable = () => {
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        fetchTimetable();
    }, []);

    const fetchTimetable = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/timetable');
            setSchedule(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch timetable');
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Class Timetable</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Your weekly schedule for classes and lectures.</p>
                </header>

                {loading ? <p>Loading schedule...</p> : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {days.map(d => {
                            const classesForDay = schedule.filter(s => s.day === d);
                            if (classesForDay.length === 0) return null;
                            return (
                                <div key={d}>
                                    <h2 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--primary-color)', marginBottom: '1rem' }}>{d}</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                                        {classesForDay.map(cls => (
                                            <div key={cls._id} className="card animate-fade-in" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary-color)' }}>
                                                <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{cls.timeSlot}</div>
                                                <div style={{ color: 'var(--primary-color)', fontSize: '1.1rem', marginBottom: '1rem' }}>{cls.subject}</div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                                    <span>📍 {cls.room}</span>
                                                    <span>👨‍🏫 {cls.faculty?.name || 'TBA'}</span>
                                                </div>
                                            </div>
                                        ))}
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

export default MyTimetable;
