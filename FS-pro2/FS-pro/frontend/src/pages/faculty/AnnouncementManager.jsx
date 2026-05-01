import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const AnnouncementManager = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [department, setDepartment] = useState('All');

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/announcements');
            setAnnouncements(res.data);
        } catch (err) {
            console.error('Failed to fetch announcements');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/announcements', { title, message, department });
            alert('Announcement posted!');
            setTitle('');
            setMessage('');
            setDepartment('All');
            fetchAnnouncements();
        } catch (err) {
            alert('Failed to post announcement');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this announcement?')) {
            try {
                await axios.delete(`http://localhost:5000/api/announcements/${id}`);
                fetchAnnouncements();
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
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Announcement Manager</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Broadcast messages to the entire campus or specific departments.</p>
                </header>

                <div className="card animate-fade-in" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="text" placeholder="Title" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <textarea placeholder="Write your announcement here..." className="input-field" style={{ minHeight: '100px', resize: 'vertical' }} value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                        <select className="input-field" value={department} onChange={(e) => setDepartment(e.target.value)}>
                            <option value="All">All Departments</option>
                            <option value="CS">Computer Science (CS)</option>
                            <option value="IT">Information Technology (IT)</option>
                            <option value="EE">Electrical Engineering (EE)</option>
                            <option value="Physics">Physics</option>
                            <option value="Mech">Mechanical Engineering (Mech)</option>
                            <option value="Business">Business Administration</option>
                        </select>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Post Announcement</button>
                    </form>
                </div>

                <h2 style={{ marginBottom: '1rem' }}>Recent Announcements</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {announcements.map(ann => (
                        <div key={ann._id} className="card animate-fade-in" style={{ padding: '1.5rem', position: 'relative' }}>
                            <button onClick={() => handleDelete(ann._id)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)' }}>{ann.title}</h3>
                            <span style={{ fontSize: '0.8rem', background: 'var(--background)', padding: '3px 8px', borderRadius: '4px', marginRight: '1rem' }}>Target: {ann.department}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Posted by: {ann.author?.name} on {new Date(ann.createdAt).toLocaleDateString()}</span>
                            <p style={{ marginTop: '1rem', lineHeight: '1.6' }}>{ann.message}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AnnouncementManager;
