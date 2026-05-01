import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const EventManager = () => {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [department, setDepartment] = useState('All');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events');
            setEvents(res.data);
        } catch (err) {
            console.error('Failed to fetch events');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/events', {
                title, description, date, department
            });
            alert('Event Created!');
            setTitle('');
            setDescription('');
            setDate('');
            fetchEvents(); // Refresh list
        } catch(err) {
            alert('Failed to create event');
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this event?')) {
            try {
                await axios.delete(`http://localhost:5000/api/events/${id}`);
                fetchEvents();
            } catch(err) {
                alert('Failed to delete event');
            }
        }
    }

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Event Manager</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Create and manage college events.</p>
                </header>

                <div className="card animate-fade-in" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="text" placeholder="Event Title" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <textarea placeholder="Description" className="input-field" style={{ minHeight: '100px', resize: 'vertical' }} value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                        <input type="date" className="input-field" value={date} onChange={(e) => setDate(e.target.value)} required />
                        <input type="text" placeholder="Department (e.g. All, Computer Science)" className="input-field" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Create Event</button>
                    </form>
                </div>

                <h2 style={{ marginBottom: '1rem' }}>Existing Events</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {events.map(event => (
                        <div key={event._id} className="card animate-fade-in" style={{ padding: '1.5rem', position: 'relative' }}>
                            <button 
                                onClick={() => handleDelete(event._id)}
                                style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}>
                                Delete
                            </button>
                            <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>{event.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{new Date(event.date).toLocaleDateString()} - {event.department}</p>
                            <p>{event.description}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
export default EventManager;
