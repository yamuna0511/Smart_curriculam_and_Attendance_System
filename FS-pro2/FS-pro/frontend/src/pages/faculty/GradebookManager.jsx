import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const GradebookManager = () => {
    const { selectedDepartment, selectedSemester } = useContext(AuthContext);
    const [students, setStudents] = useState([]);
    const [grades, setGrades] = useState([]);
    
    // Form state for adding/editing a grade
    const [isEditing, setIsEditing] = useState(false);
    const [editingGradeId, setEditingGradeId] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [score, setScore] = useState('');
    const [total, setTotal] = useState('');
    const [remarks, setRemarks] = useState('');

    useEffect(() => {
        if (selectedDepartment && selectedSemester) {
            fetchData();
        }
    }, [selectedDepartment, selectedSemester]);

    const fetchData = async () => {
        try {
            const stRes = await axios.get(`http://localhost:5000/api/grades/students?department=${selectedDepartment}&semester=${selectedSemester}`);
            setStudents(stRes.data);
            
            const grRes = await axios.get(`http://localhost:5000/api/grades/department?department=${selectedDepartment}&semester=${selectedSemester}`);
            setGrades(grRes.data);
            
            if (stRes.data.length > 0 && !isEditing) setSelectedStudent(stRes.data[0].user._id);
        } catch (err) {
            console.error('Failed to fetch data', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/grades/update/${editingGradeId}`, {
                    score: Number(score),
                    total: Number(total),
                    remarks
                });
                alert('Grade successfully updated!');
            } else {
                await axios.post('http://localhost:5000/api/grades/add', {
                    studentId: selectedStudent,
                    title,
                    subject,
                    score: Number(score),
                    total: Number(total),
                    department: selectedDepartment,
                    semester: selectedSemester,
                    remarks
                });
                alert('Grade successfully recorded!');
            }
            resetForm();
            fetchData(); // Refresh list
        } catch (err) {
            alert(isEditing ? 'Failed to update grade' : 'Failed to record grade');
        }
    };

    const handleEdit = (grade) => {
        setIsEditing(true);
        setEditingGradeId(grade._id);
        setSelectedStudent(grade.student._id || grade.student); // Assuming student might be populated or just ID
        setTitle(grade.title);
        setSubject(grade.subject);
        setScore(grade.score);
        setTotal(grade.total);
        setRemarks(grade.remarks || '');
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditingGradeId(null);
        setTitle('');
        setSubject('');
        setScore('');
        setTotal('');
        setRemarks('');
        if (students.length > 0) setSelectedStudent(students[0].user._id);
    };

    if (!selectedDepartment || !selectedSemester) {
        return (
            <div className="dashboard-layout">
                <Sidebar />
                <main className="main-content">
                    <header style={{ marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Gradebook Manager</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Please select department and semester from the dashboard first.</p>
                    </header>
                </main>
            </div>
        );
    }

    // Map grades to students
    const getGradesForStudent = (studentId) => {
        return grades.filter(g => {
            // handle string or object ID comparison
            const gStudentId = typeof g.student === 'object' ? g.student._id : g.student;
            return gStudentId === studentId;
        });
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Gradebook Manager</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage marks for students in {selectedDepartment} Semester {selectedSemester}.</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    
                    {/* Add/Edit Form */}
                    <div className="card animate-fade-in" style={{ alignSelf: 'start' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>{isEditing ? 'Update Mark' : 'Record New Mark'}</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Select Student</label>
                                <select className="input-field" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} disabled={isEditing} required>
                                    <option value="">Select a student</option>
                                    {students.map(s => (
                                        <option key={s.user._id} value={s.user._id}>{s.user.name} ({s.user.email})</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Exam Title</label>
                                    <input type="text" placeholder="e.g. Midterm 1" className="input-field" value={title} onChange={(e) => setTitle(e.target.value)} disabled={isEditing} required />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subject Code</label>
                                    <input type="text" placeholder="e.g. CS101" className="input-field" value={subject} onChange={(e) => setSubject(e.target.value)} disabled={isEditing} required />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Marks Scored</label>
                                    <input type="number" min="0" className="input-field" value={score} onChange={(e) => setScore(e.target.value)} required />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Total Marks</label>
                                    <input type="number" min="1" className="input-field" value={total} onChange={(e) => setTotal(e.target.value)} required />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Remarks (Optional)</label>
                                <input type="text" placeholder="Good effort..." className="input-field" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary">{isEditing ? 'Save Update' : 'Record Mark'}</button>
                                {isEditing && <button type="button" className="btn" onClick={resetForm}>Cancel</button>}
                            </div>
                        </form>
                    </div>

                    {/* Students and Grades List */}
                    <div className="card animate-fade-in" style={{ alignSelf: 'start', maxHeight: '75vh', overflowY: 'auto' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Students & Marks</h2>
                        {students.length === 0 ? (
                            <p>No students found for this cohort.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {students.map(s => {
                                    const stGrades = getGradesForStudent(s.user._id);
                                    return (
                                        <div key={s.user._id} style={{ padding: '1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{s.user.name} <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>({s.enrollmentNumber})</span></h3>
                                            
                                            {stGrades.length === 0 ? (
                                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No marks recorded yet.</p>
                                            ) : (
                                                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem' }}>
                                                    <thead>
                                                        <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                                            <th style={{ padding: '0.5rem' }}>Subject Code</th>
                                                            <th style={{ padding: '0.5rem' }}>Exam</th>
                                                            <th style={{ padding: '0.5rem' }}>Score</th>
                                                            <th style={{ padding: '0.5rem' }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {stGrades.map(g => (
                                                            <tr key={g._id} style={{ borderBottom: '1px solid var(--border)' }}>
                                                                <td style={{ padding: '0.5rem' }}>{g.subject}</td>
                                                                <td style={{ padding: '0.5rem' }}>{g.title}</td>
                                                                <td style={{ padding: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>{g.score} / {g.total}</td>
                                                                <td style={{ padding: '0.5rem' }}>
                                                                    <button 
                                                                        onClick={() => handleEdit(g)}
                                                                        style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default GradebookManager;
