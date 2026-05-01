import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const TimetableManager = () => {
    const [schedule, setSchedule] = useState([]);
    const [day, setDay] = useState('Monday');
    const [timeSlot, setTimeSlot] = useState('');
    const [subject, setSubject] = useState('');
    const [room, setRoom] = useState('');
    const [department, setDepartment] = useState('CS');

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        fetchTimetable();
    }, []);

    const fetchTimetable = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/timetable');
            setSchedule(res.data);
        } catch (err) {
            console.error('Failed to fetch timetable');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/timetable', { day, timeSlot, subject, room, department });
            alert('Class added to timetable!');
            setTimeSlot('');
            setSubject('');
            setRoom('');
            fetchTimetable();
        } catch (err) {
            alert('Failed to add class');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Remove this class?')) {
            try {
                await axios.delete(`http://localhost:5000/api/timetable/${id}`);
                fetchTimetable();
            } catch (err) {
                alert('Failed to delete');
            }
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Timetable Manager</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage the weekly class schedule for students.</p>
                </header>

                <div className="card animate-fade-in" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Day</label>
                                <select className="input-field" value={day} onChange={(e) => setDay(e.target.value)}>
                                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Time Slot</label>
                                <input type="text" placeholder="e.g. 09:00 AM - 10:00 AM" className="input-field" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subject</label>
                                <input type="text" placeholder="e.g. Database Systems" className="input-field" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Room</label>
                                <input type="text" placeholder="e.g. Room 101" className="input-field" value={room} onChange={(e) => setRoom(e.target.value)} required />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Department</label>
                            <input type="text" placeholder="e.g. CS" className="input-field" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Add Class</button>
                    </form>
                </div>

                <h2 style={{ marginBottom: '1rem' }}>Current Schedule</h2>
                {days.map(d => {
                    const classesForDay = schedule.filter(s => s.day === d);
                    if (classesForDay.length === 0) return null;
                    return (
                        <div key={d} style={{ marginBottom: '2rem' }}>
                            <h3 style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--primary-color)' }}>{d}</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                                {classesForDay.map(cls => (
                                    <div key={cls._id} className="card" style={{ padding: '1rem', position: 'relative' }}>
                                        <button onClick={() => handleDelete(cls._id)} style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', color: 'red', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>
                                        <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{cls.timeSlot}</div>
                                        <div style={{ color: 'var(--primary-color)' }}>{cls.subject}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Room: {cls.room} | Dept: {cls.department}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Faculty: {cls.faculty?.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </main>
        </div>
    );
};

export default TimetableManager;
