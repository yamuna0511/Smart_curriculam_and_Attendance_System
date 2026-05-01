import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';


import FacultyDashboard from './pages/FacultyDashboard';
import AttendanceManager from './pages/faculty/AttendanceManager';
import CurriculumManager from './pages/faculty/CurriculumManager';
import AssignmentManager from './pages/faculty/AssignmentManager';
import EventManager from './pages/faculty/EventManager';
import LeaveApprovals from './pages/faculty/LeaveApprovals';
import GradebookManager from './pages/faculty/GradebookManager';
import AnnouncementManager from './pages/faculty/AnnouncementManager';
import TimetableManager from './pages/faculty/TimetableManager';

import StudentDashboard from './pages/StudentDashboard';
import MyAttendance from './pages/student/MyAttendance';
import MyCurriculum from './pages/student/MyCurriculum';
import MyAssignments from './pages/student/MyAssignments';
import EventsBoard from './pages/student/EventsBoard';
import LeaveApplication from './pages/student/LeaveApplication';
import MyGrades from './pages/student/MyGrades';
import Announcements from './pages/student/Announcements';
import MyTimetable from './pages/student/MyTimetable';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
    return children;
};

const RoleRedirect = () => {
    const { user, loading } = useContext(AuthContext);
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    if (user.role === 'Admin') return <Navigate to="/admin" replace />;
    if (user.role === 'Faculty') return <Navigate to="/faculty" replace />;
    if (user.role === 'Student') return <Navigate to="/student" replace />;
    return <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleRedirect />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['Admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['Admin']}><ManageUsers /></ProtectedRoute>} />


          <Route path="/faculty" element={<ProtectedRoute allowedRoles={['Faculty']}><FacultyDashboard /></ProtectedRoute>} />
          <Route path="/faculty/attendance" element={<ProtectedRoute allowedRoles={['Faculty']}><AttendanceManager /></ProtectedRoute>} />
          <Route path="/faculty/curriculum" element={<ProtectedRoute allowedRoles={['Faculty']}><CurriculumManager /></ProtectedRoute>} />
          <Route path="/faculty/assignments" element={<ProtectedRoute allowedRoles={['Faculty']}><AssignmentManager /></ProtectedRoute>} />
          <Route path="/faculty/events" element={<ProtectedRoute allowedRoles={['Admin', 'Faculty']}><EventManager /></ProtectedRoute>} />
          <Route path="/faculty/leave" element={<ProtectedRoute allowedRoles={['Admin', 'Faculty']}><LeaveApprovals /></ProtectedRoute>} />
          <Route path="/faculty/grades" element={<ProtectedRoute allowedRoles={['Faculty']}><GradebookManager /></ProtectedRoute>} />
          <Route path="/faculty/announcements" element={<ProtectedRoute allowedRoles={['Admin', 'Faculty']}><AnnouncementManager /></ProtectedRoute>} />
          <Route path="/faculty/timetable" element={<ProtectedRoute allowedRoles={['Admin', 'Faculty']}><TimetableManager /></ProtectedRoute>} />

          <Route path="/student" element={<ProtectedRoute allowedRoles={['Student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/attendance" element={<ProtectedRoute allowedRoles={['Student']}><MyAttendance /></ProtectedRoute>} />
          <Route path="/student/curriculum" element={<ProtectedRoute allowedRoles={['Student']}><MyCurriculum /></ProtectedRoute>} />
          <Route path="/student/assignments" element={<ProtectedRoute allowedRoles={['Student']}><MyAssignments /></ProtectedRoute>} />
          <Route path="/student/events" element={<ProtectedRoute allowedRoles={['Student']}><EventsBoard /></ProtectedRoute>} />
          <Route path="/student/leave" element={<ProtectedRoute allowedRoles={['Student']}><LeaveApplication /></ProtectedRoute>} />
          <Route path="/student/grades" element={<ProtectedRoute allowedRoles={['Student']}><MyGrades /></ProtectedRoute>} />
          <Route path="/student/announcements" element={<ProtectedRoute allowedRoles={['Student']}><Announcements /></ProtectedRoute>} />
          <Route path="/student/timetable" element={<ProtectedRoute allowedRoles={['Student']}><MyTimetable /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
