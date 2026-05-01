import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import { BookOpen, Calendar, Activity, Users } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const FacultyDashboard = () => {
    const { selectedDepartment, selectedSemester, setDepartmentSemester } = useContext(AuthContext);
    const [stats, setStats] = useState({
        activeAssignments: 0,
        enrolledStudents: 0
    });
    const [students, setStudents] = useState([]);
    const [dept, setDept] = useState(selectedDepartment || '');
    const [sem, setSem] = useState(selectedSemester || '');
    const [editingFilter, setEditingFilter] = useState(false);

    useEffect(() => {
        if (selectedDepartment && selectedSemester) {
            fetchInfo();
            fetchStudents();
        }
    }, [selectedDepartment, selectedSemester]);

    const fetchInfo = async () => {
        try {
            const stRes = await axios.get(`http://localhost:5000/api/faculty/students?department=${selectedDepartment}&semester=${selectedSemester}`);
            setStats({ activeAssignments: 3, enrolledStudents: stRes.data.length });
        } catch(e) {}
    };

    const fetchStudents = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/faculty/students?department=${selectedDepartment}&semester=${selectedSemester}`);
            setStudents(res.data);
        } catch(e) {}
    };

    const handleSetFilter = () => {
        if (dept && sem) {
            setDepartmentSemester(dept, sem);
            setEditingFilter(false);
        }
    };

    const handleEditFilter = () => {
        setDept(selectedDepartment);
        setSem(selectedSemester);
        setEditingFilter(true);
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }} className="gradient-text">Faculty Control Center</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your cohort, distribute work, and monitor syllabus velocity.</p>
                </header>
                
                {!selectedDepartment || !selectedSemester || editingFilter ? (
                    <div className="card animate-fade-in" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
                        <h3>{editingFilter ? 'Edit' : 'Select'} Department and Semester</h3>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Department</label>
                                <input type="text" placeholder="e.g. CS" className="input-field" value={dept} onChange={(e) => setDept(e.target.value)} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Semester</label>
                                <input type="number" min="1" max="8" className="input-field" value={sem} onChange={(e) => setSem(e.target.value)} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button className="btn btn-primary" onClick={handleSetFilter}>Set Filter</button>
                            {editingFilter && <button className="btn" onClick={() => setEditingFilter(false)}>Cancel</button>}
                        </div>
                    </div>
                ) : (
                    <>
                            <div style={{ marginBottom: '1rem' }}>
                            <button className="btn" onClick={handleEditFilter}>Change Department/Semester</button>
                            <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>Current: {selectedDepartment} Semester {selectedSemester}</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            
                            <div className="card glass-panel animate-fade-in dashboard-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div className="icon-wrapper" style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)' }}>
                                    <Users size={32} />
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Mentored Students</h3>
                                    <p style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.enrolledStudents}</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>Current Cohort Size</span>
                                </div>
                            </div>

                            <div className="card glass-panel animate-fade-in dashboard-card" style={{ animationDelay: '0.1s', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div className="icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--secondary)' }}>
                                    <BookOpen size={32} />
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Curriculum Velocity</h3>
                                    <p style={{ fontSize: '2rem', fontWeight: '800' }}>Optimal</p>
                                    <div className="progress-bar-bg"><div className="progress-bar-fill" style={{width: `80%`}}></div></div>
                                </div>
                            </div>

                            <div className="card glass-panel animate-fade-in dashboard-card" style={{ animationDelay: '0.2s', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div className="icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)' }}>
                                    <Calendar size={32} />
                                </div>
                                <div>
                                    <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Assignments</h3>
                                    <p style={{ fontSize: '2rem', fontWeight: '800' }}>{stats.activeAssignments}</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Requires grading</span>
                                </div>
                            </div>
                        </div>

                        <div className="card glass-panel animate-fade-in" style={{ marginTop: '2rem', animationDelay: '0.3s' }}>
                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users color="var(--primary)"/> Student List for {selectedDepartment} Semester {selectedSemester}</h2>
                            {students.length === 0 ? (
                                <p>No students found for the selected department and semester.</p>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                    {students.map(student => (
                                        <div key={student._id} className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <h3>{student.user.name}</h3>
                                            <p><strong>Email:</strong> {student.user.email}</p>
                                            <p><strong>Roll Number:</strong> {student.enrollmentNumber}</p>
                                            <p><strong>Semester:</strong> {student.semester}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="card glass-panel animate-fade-in" style={{ marginTop: '2rem', animationDelay: '0.4s' }}>
                            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity color="var(--primary)"/> Quick Actions</h2>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <a href="/faculty/attendance" className="btn btn-primary">Take Attendance Now</a>
                                <a href="/faculty/assignments" className="btn" style={{ background: 'var(--background)' }}>Draft Assignment</a>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};
export default FacultyDashboard;
