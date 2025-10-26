import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHospital, FaUser, FaSignOutAlt, FaBell } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaHospital className="navbar-icon" />
        <Link to="/dashboard">Patient Health Record System</Link>
      </div>

      <div className="navbar-menu">
        <div className="navbar-item">
          <FaBell className="icon" />
        </div>

        <div className="navbar-user">
          <FaUser className="icon" />
          <span>{user?.firstName} {user?.lastName}</span>
          <span className="user-role">{user?.role}</span>
        </div>

        <button onClick={handleLogout} className="btn btn-outline">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
