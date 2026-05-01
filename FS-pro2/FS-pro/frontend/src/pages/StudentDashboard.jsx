import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { BookOpen, Activity, AlertCircle, TrendingUp } from 'lucide-react';
import axios from 'axios';

const StudentDashboard = () => {
    const [stats, setStats] = useState({
        attendancePct: 100,
        syllabusPct: 0,
        pendingAssignments: 0,
        recentActivity: []
    });

    useEffect(() => {
        const fetchDashboardInfo = async () => {
            try {
                const [attRes, currRes, assiRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/student/attendance'),
                    axios.get('http://localhost:5000/api/student/curriculum'),
                    axios.get('http://localhost:5000/api/student/assignments')
                ]);
                
                // Attendance Math
                const attData = attRes.data;
                const attTotal = attData.length;
                const attPresent = attData.filter(a => a.status === 'Present').length;
                const attendancePct = attTotal > 0 ? ((attPresent/attTotal)*100).toFixed(1) : 100;
                
                // Curriculum Math
                const currData = currRes.data;
                let totalTopics = 0;
                let completedTopics = 0;
                currData.forEach(c => {
                    totalTopics += c.topics.length;
                    completedTopics += c.topics.filter(t => t.isCompleted).length;
                });
                const syllabusPct = totalTopics > 0 ? ((completedTopics/totalTopics)*100).toFixed(1) : 0;
                
                // Assignment Math
                const assiData = assiRes.data;
                const pending = assiData.filter(a => new Date(a.dueDate) >= new Date()).length;

                // Activity Math
                const activities = [];
                if (currData.length > 0) activities.push("Curriculum synchronized for Semester " + currData[0].semester);
                if (assiData.length > 0) activities.push("New active assignment: " + assiData[0].title);
                if (attData.length > 0) activities.push("Attendance recorded for " + attData[0].subject);

                setStats({ attendancePct, syllabusPct, pendingAssignments: pending, recentActivity: activities });
            } catch (err) {
                console.error(err);
            }
        };
        fetchDashboardInfo();
    }, []);

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }} className="gradient-text">Student Headquarters</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Real-time overview of your academic trajectory.</p>
                </header>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    <div className="card glass-panel animate-fade-in dashboard-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div className="icon-wrapper" style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)' }}>
                            <Activity size={32} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Attendance</h3>
                            <p style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.attendancePct}%</p>
                            {stats.attendancePct >= 75 ? <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: '600' }}>Good Standing</span> : <span style={{ fontSize: '0.75rem', color: 'var(--danger)', fontWeight: '600' }}>Threshold Warning</span>}
                        </div>
                    </div>

                    <div className="card glass-panel animate-fade-in dashboard-card" style={{ animationDelay: '0.1s', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div className="icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)' }}>
                            <TrendingUp size={32} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Syllabus Mastered</h3>
                            <p style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.syllabusPct}%</p>
                            <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width: `${stats.syllabusPct}%`}}></div></div>
                        </div>
                    </div>

                    <div className="card glass-panel animate-fade-in dashboard-card" style={{ animationDelay: '0.2s', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div className="icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
                            <AlertCircle size={32} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Action Items</h3>
                            <p style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.pendingAssignments}</p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>upcoming deadlines</span>
                        </div>
                    </div>
                </div>

                <div className="card glass-panel animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BookOpen color="var(--primary)"/> Recent Academic Activity</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {stats.recentActivity.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No recent activity to display.</p> : 
                            stats.recentActivity.map((act, i) => (
                                <div key={i} className="activity-item">
                                    <div className="activity-dot"></div>
                                    <span style={{ fontWeight: '500' }}>{act}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>
        </div>
    );
};
export default StudentDashboard;
