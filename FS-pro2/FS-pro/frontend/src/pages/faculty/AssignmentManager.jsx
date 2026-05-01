import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const AssignmentManager = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('Computer Science 101');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/faculty/assignments', {
                title, description, subject, dueDate
            });
            alert('Assignment Created!');
            setTitle('');
            setDescription('');
        } catch(err) {
            alert('Failed to create assignment');
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Create Assignment</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Distribute coursework to students.</p>
                </header>
                <div className="card animate-fade-in" style={{ maxWidth: '600px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="text" placeholder="Assignment Title" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <textarea placeholder="Description" className="input-field" style={{ minHeight: '120px', resize: 'vertical' }} value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                        <input type="text" placeholder="Subject" className="input-field" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                        <input type="date" className="input-field" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Publish Assignment</button>
                    </form>
                </div>
            </main>
        </div>
    );
};
export default AssignmentManager;
