import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');

    // Define your production API base URL here for easy updates
    const API_BASE_URL = 'https://smart-curriculam-and-attendance-system-iikczff19.vercel.app/api/auth';

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('name');
        const dept = localStorage.getItem('selectedDepartment');
        const sem = localStorage.getItem('selectedSemester');
        if (token && role && name) {
            setUser({ token, role, name });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        if (dept) setSelectedDepartment(dept);
        if (sem) setSelectedSemester(sem);
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // URL updated from localhost to Vercel production URL
        const res = await axios.post(`${API_BASE_URL}/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        localStorage.setItem('name', res.data.name);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        setUser({ token: res.data.token, role: res.data.role, name: res.data.name });
        return res.data;
    };

    const register = async (userData) => {
        // URL updated from localhost to Vercel production URL
        const res = await axios.post(`${API_BASE_URL}/register`, userData);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        localStorage.removeItem('selectedDepartment');
        localStorage.removeItem('selectedSemester');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setSelectedDepartment('');
        setSelectedSemester('');
    };

    const setDepartmentSemester = (dept, sem) => {
        setSelectedDepartment(dept);
        setSelectedSemester(sem);
        localStorage.setItem('selectedDepartment', dept);
        localStorage.setItem('selectedSemester', sem);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, selectedDepartment, selectedSemester, setDepartmentSemester }}>
            {children}
        </AuthContext.Provider>
    );
};