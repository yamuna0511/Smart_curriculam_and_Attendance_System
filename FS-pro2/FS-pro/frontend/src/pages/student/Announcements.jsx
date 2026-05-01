import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/announcements');
            setAnnouncements(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch announcements');
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Announcements</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Important notices and updates from the administration and faculty.</p>
                </header>

                {loading ? <p>Loading...</p> : announcements.length === 0 ? (
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <p>No new announcements.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px' }}>
                        {announcements.map(ann => (
                            <div key={ann._id} className="card animate-fade-in" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)' }}>{ann.title}</h3>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(ann.createdAt).toLocaleDateString()}</span>
                                </div>
                                <span style={{ fontSize: '0.8rem', background: 'var(--background)', padding: '3px 8px', borderRadius: '4px' }}>Target: {ann.department}</span>
                                <p style={{ marginTop: '1rem', lineHeight: '1.6', color: 'var(--text-main)' }}>{ann.message}</p>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', textAlign: 'right' }}>
                                    Posted by: {ann.author?.name}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Announcements;
