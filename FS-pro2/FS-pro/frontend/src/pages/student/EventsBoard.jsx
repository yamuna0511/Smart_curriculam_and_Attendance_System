import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const EventsBoard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events');
            setEvents(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch events');
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Campus Events</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Stay updated with upcoming hackathons, seminars, and activities.</p>
                </header>

                {loading ? (
                    <p>Loading events...</p>
                ) : events.length === 0 ? (
                    <div className="card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        <p>No upcoming events at the moment.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {events.map(event => (
                            <div key={event._id} className="card animate-fade-in" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <h3 style={{ color: 'var(--text-main)' }}>{event.title}</h3>
                                    <span style={{ fontSize: '0.8rem', background: 'var(--primary-light)', color: 'var(--primary-color)', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                                        {event.department}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                    <span>📅 {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <p style={{ color: 'var(--text-main)', lineHeight: '1.5' }}>{event.description}</p>
                                <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={() => alert('Registered for ' + event.title + '!')}>
                                    Register Interest
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default EventsBoard;
