import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const LeaveApplication = () => {
    const [leaves, setLeaves] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyLeaves();
    }, []);

    const fetchMyLeaves = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/leave/my-leaves');
            setLeaves(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch leaves', err);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/leave/apply', { startDate, endDate, reason });
            alert('Leave application submitted successfully!');
            setStartDate('');
            setEndDate('');
            setReason('');
            fetchMyLeaves();
        } catch (err) {
            alert('Failed to submit application');
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Approved': return { color: 'green', fontWeight: 'bold' };
            case 'Rejected': return { color: 'red', fontWeight: 'bold' };
            default: return { color: 'orange', fontWeight: 'bold' }; // Pending
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Leave Application</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Apply for leave and track your requests.</p>
                </header>

                <div className="card animate-fade-in" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Start Date</label>
                                <input type="date" className="input-field" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>End Date</label>
                                <input type="date" className="input-field" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Reason</label>
                            <textarea placeholder="Please explain why you need leave..." className="input-field" style={{ minHeight: '100px', resize: 'vertical' }} value={reason} onChange={(e) => setReason(e.target.value)} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Submit Request</button>
                    </form>
                </div>

                <h2 style={{ marginBottom: '1rem' }}>My Applications</h2>
                {loading ? <p>Loading...</p> : leaves.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No leave applications found.</p> : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {leaves.map(leave => (
                            <div key={leave._id} className="card animate-fade-in" style={{ padding: '1.5rem', borderLeft: `4px solid ${getStatusStyle(leave.status).color}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}
                                    </span>
                                    <span style={getStatusStyle(leave.status)}>{leave.status}</span>
                                </div>
                                <p style={{ marginBottom: '1rem' }}>{leave.reason}</p>
                                {leave.facultyComment && (
                                    <div style={{ background: 'var(--background)', padding: '0.75rem', borderRadius: '4px', fontSize: '0.9rem' }}>
                                        <strong>Faculty Comment:</strong> {leave.facultyComment}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default LeaveApplication;
