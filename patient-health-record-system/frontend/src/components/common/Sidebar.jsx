import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaPrescription,
  FaFlask,
  FaCalendar,
  FaUsersCog,
  FaHistory
} from 'react-icons/fa';

const Sidebar = () => {
  const { user } = useAuth();

  const menuItems = {
    admin: [
      { path: '/dashboard/admin', label: 'Dashboard', icon: <FaHome /> },
      { path: '/patients', label: 'Patients', icon: <FaUsers /> },
      { path: '/appointments', label: 'Appointments', icon: <FaCalendar /> },
      { path: '/admin/users', label: 'User Management', icon: <FaUsersCog /> },
      { path: '/admin/audit-logs', label: 'Audit Logs', icon: <FaHistory /> }
    ],
    doctor: [
      { path: '/dashboard/doctor', label: 'Dashboard', icon: <FaHome /> },
      { path: '/patients', label: 'Patients', icon: <FaUsers /> },
      { path: '/health-records', label: 'Health Records', icon: <FaFileAlt /> },
      { path: '/prescriptions', label: 'Prescriptions', icon: <FaPrescription /> },
      { path: '/lab-results', label: 'Lab Results', icon: <FaFlask /> },
      { path: '/appointments', label: 'Appointments', icon: <FaCalendar /> }
    ],
    nurse: [
      { path: '/dashboard/nurse', label: 'Dashboard', icon: <FaHome /> },
      { path: '/patients', label: 'Patients', icon: <FaUsers /> },
      { path: '/health-records', label: 'Health Records', icon: <FaFileAlt /> },
      { path: '/appointments', label: 'Appointments', icon: <FaCalendar /> }
    ],
    patient: [
      { path: '/dashboard/patient', label: 'Dashboard', icon: <FaHome /> },
      { path: '/health-records', label: 'My Records', icon: <FaFileAlt /> },
      { path: '/prescriptions', label: 'Prescriptions', icon: <FaPrescription /> },
      { path: '/lab-results', label: 'Lab Results', icon: <FaFlask /> },
      { path: '/appointments', label: 'Appointments', icon: <FaCalendar /> }
    ]
  };

  const currentMenu = menuItems[user?.role] || [];

  return (
    <aside className="sidebar">
      <ul className="sidebar-menu">
        {currentMenu.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
