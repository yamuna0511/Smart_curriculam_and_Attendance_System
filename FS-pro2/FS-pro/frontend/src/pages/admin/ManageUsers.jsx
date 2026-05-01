import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    
    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('password123');
    const [role, setRole] = useState('Student');

    const fetchUsers = () => {
        axios.get('http://localhost:5000/api/admin/users').then(res => {
            setUsers(res.data);
        });
    };

    useEffect(() => fetchUsers(), []);

    const deleteUser = async (id) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
                fetchUsers();
            } catch(e) { alert('Failed to delete'); }
        }
    };
    
    const addUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/register', {
                name, email, password, role,
                extraDetails: role === 'Student' ? { enrollmentNumber: `STU${Math.floor(Math.random()*10000)}`, department: 'CS', semester: 1 } : 
                              role === 'Faculty' ? { employeeId: `FAC${Math.floor(Math.random()*10000)}`, department: 'CS', subjects: [] } : {}
            });
            alert('User added successfully!');
            fetchUsers();
            setName('');
            setEmail('');
        } catch(err) {
            alert('Error adding user. Email might be in use.');
        }
    };

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="main-content">
                <header style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>Manage Users</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Add new users or remove existing ones.</p>
                </header>
                
                <div className="card animate-fade-in" style={{ marginBottom: '2rem', maxWidth: '600px' }}>
                    <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Create New User</h2>
                    <form onSubmit={addUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <input type="text" placeholder="Full Name" className="input-field" value={name} onChange={(e)=>setName(e.target.value)} required />
                            <select className="input-field" value={role} onChange={(e)=>setRole(e.target.value)}>
                                <option value="Student">Student</option>
                                <option value="Faculty">Faculty</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                        <input type="email" placeholder="Email Address" className="input-field" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                        <input type="text" placeholder="Default Password" className="input-field" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Add User</button>
                    </form>
                </div>

                <div className="card animate-fade-in" style={{ padding: 0, overflow: 'hidden' }}>
                    {users.map((u, idx) => (
                        <div key={u._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderTop: idx > 0 ? '1px solid var(--border)' : 'none' }}>
                            <div>
                                <h4 style={{ fontWeight: '600' }}>{u.name} <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '1rem', background: 'var(--primary)', color: 'white' }}>{u.role}</span></h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{u.email}</p>
                            </div>
                            {u.role !== 'Admin' && <button className="btn btn-danger" style={{ padding: '0.5rem 1rem' }} onClick={() => deleteUser(u._id)}>Delete</button>}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
export default ManageUsers;
