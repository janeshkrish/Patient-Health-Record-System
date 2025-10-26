import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DoctorDashboard from './components/dashboard/DoctorDashboard';
import PatientDashboard from './components/dashboard/PatientDashboard';
import NurseDashboard from './components/dashboard/NurseDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import PatientList from './components/patient/PatientList';
import PatientProfile from './components/patient/PatientProfile';
import HealthRecordList from './components/healthRecord/HealthRecordList';
import PrescriptionList from './components/prescription/PrescriptionList';
import LabResultList from './components/labResult/LabResultList';
import AppointmentList from './components/appointment/AppointmentList';
import UserManagement from './components/admin/UserManagement';
import AuditLogs from './components/admin/AuditLogs';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardRedirect />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/doctor" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DoctorDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/patient" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <PatientDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/nurse" element={
        <ProtectedRoute allowedRoles={['nurse']}>
          <NurseDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/patients" element={
        <ProtectedRoute allowedRoles={['doctor', 'nurse', 'admin']}>
          <PatientList />
        </ProtectedRoute>
      } />
      
      <Route path="/patients/:id" element={
        <ProtectedRoute>
          <PatientProfile />
        </ProtectedRoute>
      } />
      
      <Route path="/health-records" element={
        <ProtectedRoute>
          <HealthRecordList />
        </ProtectedRoute>
      } />
      
      <Route path="/prescriptions" element={
        <ProtectedRoute>
          <PrescriptionList />
        </ProtectedRoute>
      } />
      
      <Route path="/lab-results" element={
        <ProtectedRoute>
          <LabResultList />
        </ProtectedRoute>
      } />
      
      <Route path="/appointments" element={
        <ProtectedRoute>
          <AppointmentList />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <UserManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/audit-logs" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AuditLogs />
        </ProtectedRoute>
      } />
      
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

// Dashboard redirect based on role
const DashboardRedirect = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" replace />;
  
  return <Navigate to={`/dashboard/${user.role}`} replace />;
};

export default AppRoutes;
