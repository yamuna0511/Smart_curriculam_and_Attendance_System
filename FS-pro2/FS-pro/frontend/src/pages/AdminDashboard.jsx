import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Users, Activity, Layers } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalStudents: 0, totalFaculty: 0, overallAttendance: 0 });

    useEffect(() => {
        const fetchStats = async () => {
             try {
                const res = await axios.get('http://localhost:5000/api/reports/dashboard');
                setStats(res.data);
             } catch(e) {}
        };
        fetchStats();
    }, []);

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }} className="gradient-text">Institution Overview</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Top-level analytics and system management.</p>
                </header>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                    
                    <div className="card glass-panel animate-fade-in dashboard-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div className="icon-wrapper" style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)' }}>
                            <Users size={32} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Students</h3>
                            <p style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.totalStudents}</p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>Registered Accounts</span>
                        </div>
                    </div>
                    
                    <div className="card glass-panel animate-fade-in dashboard-card" style={{ animationDelay: '0.1s', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div className="icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)' }}>
                            <Layers size={32} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Faculty</h3>
                            <p style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.totalFaculty}</p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: '600' }}>Active Instructors</span>
                        </div>
                    </div>
                    
                    <div className="card glass-panel animate-fade-in dashboard-card" style={{ animationDelay: '0.2s', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div className="icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
                            <Activity size={32} />
                        </div>
                        <div>
                            <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Overall Attendance</h3>
                            <p style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.overallAttendance}%</p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Institution-wide average</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
