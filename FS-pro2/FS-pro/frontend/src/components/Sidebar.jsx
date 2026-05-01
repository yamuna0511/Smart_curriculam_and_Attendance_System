import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { LogOut, Home, Users, BookOpen, Calendar, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navItems = {
    Admin: [
        { label: 'Dashboard', icon: Home, path: '/admin' },
        { label: 'Manage Users', icon: Users, path: '/admin/users' },

        { label: 'Events', icon: Calendar, path: '/faculty/events' },
        { label: 'Leave Approvals', icon: Activity, path: '/faculty/leave' }
    ],
    Faculty: [
        { label: 'Dashboard', icon: Home, path: '/faculty' },
        { label: 'Attendance', icon: Activity, path: '/faculty/attendance' },
        { label: 'Curriculum', icon: BookOpen, path: '/faculty/curriculum' },
        { label: 'Assignments', icon: Calendar, path: '/faculty/assignments' },
        { label: 'Events', icon: Calendar, path: '/faculty/events' },
        { label: 'Leave Approvals', icon: Activity, path: '/faculty/leave' },
        { label: 'Gradebook', icon: Activity, path: '/faculty/grades' },
        { label: 'Announcements', icon: Activity, path: '/faculty/announcements' },
        { label: 'Timetable', icon: Calendar, path: '/faculty/timetable' }
    ],
    Student: [
        { label: 'Dashboard', icon: Home, path: '/student' },
        { label: 'My Attendance', icon: Activity, path: '/student/attendance' },
        { label: 'My Curriculum', icon: BookOpen, path: '/student/curriculum' },
        { label: 'My Assignments', icon: Calendar, path: '/student/assignments' },
        { label: 'Events Board', icon: Calendar, path: '/student/events' },
        { label: 'Leave Application', icon: Activity, path: '/student/leave' },
        { label: 'My Report Card', icon: Activity, path: '/student/grades' },
        { label: 'Announcements', icon: Activity, path: '/student/announcements' },
        { label: 'My Timetable', icon: Calendar, path: '/student/timetable' }
    ]
};

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    
    if (!user) return null;
    
    const items = navItems[user.role] || [];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <h2 style={{ marginBottom: '2rem', color: 'var(--primary)', paddingLeft: '1rem' }}>Smart Campus</h2>
            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {items.map((item, idx) => (
                    <button key={idx} onClick={() => navigate(item.path)} style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
                        border: 'none', background: 'transparent', cursor: 'pointer',
                        borderRadius: '8px', color: 'var(--text-main)', textAlign: 'left',
                        fontWeight: '500', transition: 'all 0.2s'
                    }} onMouseOver={(e) => e.currentTarget.style.background = 'var(--background)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                        <item.icon size={20} color="var(--primary)" />
                        {item.label}
                    </button>
                ))}
            </nav>
            <button onClick={handleLogout} className="btn" style={{ background: 'var(--background)', color: 'var(--text-main)' }}>
                <LogOut size={20} /> Logout
            </button>
        </aside>
    );
};

export default Sidebar;
