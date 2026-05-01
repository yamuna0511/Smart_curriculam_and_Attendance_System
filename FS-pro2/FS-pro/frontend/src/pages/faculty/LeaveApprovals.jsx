import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const LeaveApprovals = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeaves();
    }, []);

    const fetchLeaves = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/leave/all');
            setLeaves(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch leaves', err);
            setLoading(false);
        }
    };

    const handleAction = async (id, status) => {
        const comment = window.prompt(`Enter a comment for ${status} (optional):`);
        if (comment === null) return; // user cancelled

        try {
            await axios.put(`http://localhost:5000/api/leave/${id}/status`, { status, facultyComment: comment });
            fetchLeaves(); // refresh
        } catch (err) {
            alert('Failed to update leave status');
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Approved': return { color: 'green', fontWeight: 'bold' };
            case 'Rejected': return { color: 'red', fontWeight: 'bold' };
            default: return { color: 'orange', fontWeight: 'bold' };
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Leave Approvals</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Review and manage student leave requests.</p>
                </header>

                {loading ? <p>Loading...</p> : leaves.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No pending leaves.</p> : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {leaves.map(leave => (
                            <div key={leave._id} className="card animate-fade-in" style={{ padding: '1.5rem', borderLeft: `4px solid ${getStatusStyle(leave.status).color}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>{leave.student ? leave.student.name : 'Unknown Student'}</h3>
                                    <span style={getStatusStyle(leave.status)}>{leave.status}</span>
                                </div>
                                <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    <div><strong>Email:</strong> {leave.student ? leave.student.email : 'N/A'}</div>
                                    <div><strong>Dates:</strong> {new Date(leave.startDate).toLocaleDateString()} to {new Date(leave.endDate).toLocaleDateString()}</div>
                                </div>
                                <p style={{ background: 'var(--background)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
                                    {leave.reason}
                                </p>
                                
                                {leave.status === 'Pending' && (
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn" style={{ background: 'green', color: 'white', flex: 1 }} onClick={() => handleAction(leave._id, 'Approved')}>Approve</button>
                                        <button className="btn" style={{ background: 'red', color: 'white', flex: 1 }} onClick={() => handleAction(leave._id, 'Rejected')}>Reject</button>
                                    </div>
                                )}
                                {leave.facultyComment && (
                                    <p style={{ fontSize: '0.85rem', marginTop: '1rem', fontStyle: 'italic' }}>
                                        Your comment: {leave.facultyComment}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default LeaveApprovals;
