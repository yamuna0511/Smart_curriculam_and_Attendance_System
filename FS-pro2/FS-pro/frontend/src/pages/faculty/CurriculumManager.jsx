import React, { useState, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const CurriculumManager = () => {
    const { selectedDepartment, selectedSemester } = useContext(AuthContext);
    const [subject, setSubject] = useState('Computer Science 101');
    const [topicName, setTopicName] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/faculty/curriculum', {
                subject, department: selectedDepartment, semester: selectedSemester, topicName, isCompleted
            });
            alert('Syllabus updated successfully!');
            setTopicName('');
        } catch (err) {
            alert('Failed to update curriculum.');
        }
    };

    if (!selectedDepartment || !selectedSemester) {
        return (
            <div className="dashboard-layout">
                <Sidebar />
                <main className="main-content">
                    <header style={{ marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Manage Curriculum</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Please select department and semester from the dashboard first.</p>
                    </header>
                </main>
            </div>
        );
    }

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Manage Curriculum</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Add subjects and topics to the syllabus progression for {selectedDepartment} Semester {selectedSemester}.</p>
                </header>
                <div className="card animate-fade-in" style={{ maxWidth: '600px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-field" required />
                        <input type="text" placeholder="Topic Name" value={topicName} onChange={(e) => setTopicName(e.target.value)} className="input-field" required />
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input type="checkbox" checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)} />
                            <span>Mark as Completed</span>
                        </label>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Save Topic</button>
                    </form>
                </div>
            </main>
        </div>
    );
};
export default CurriculumManager;
