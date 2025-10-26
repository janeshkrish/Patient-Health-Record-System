import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import { FaFileAlt, FaPrescription, FaFlask, FaCalendar } from 'react-icons/fa';
import api from '../../services/api';

const PatientDashboard = () => {
  const [stats, setStats] = useState({
    healthRecords: 0,
    prescriptions: 0,
    labResults: 0,
    upcomingAppointments: 0
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      const [recordsRes, prescriptionsRes, labRes, appointmentsRes] = await Promise.all([
        api.get('/health-records'),
        api.get('/prescriptions'),
        api.get('/lab-results'),
        api.get('/appointments')
      ]);

      setStats({
        healthRecords: recordsRes.data.count || 0,
        prescriptions: prescriptionsRes.data.count || 0,
        labResults: labRes.data.count || 0,
        upcomingAppointments: appointmentsRes.data.count || 0
      });

      setUpcomingAppointments(appointmentsRes.data.data?.slice(0, 5) || []);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <h1>My Health Dashboard</h1>
            <p>View and manage your health information</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card stat-primary">
              <FaFileAlt className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.healthRecords}</h3>
                <p>Health Records</p>
              </div>
            </div>

            <div className="stat-card stat-success">
              <FaPrescription className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.prescriptions}</h3>
                <p>Prescriptions</p>
              </div>
            </div>

            <div className="stat-card stat-warning">
              <FaFlask className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.labResults}</h3>
                <p>Lab Results</p>
              </div>
            </div>

            <div className="stat-card stat-info">
              <FaCalendar className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.upcomingAppointments}</h3>
                <p>Appointments</p>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Upcoming Appointments</h2>
              <Link to="/appointments" className="btn btn-sm btn-primary">View All</Link>
            </div>

            {upcomingAppointments.length > 0 ? (
              <div className="appointment-list">
                {upcomingAppointments.map((apt) => (
                  <div key={apt._id} className="appointment-item">
                    <div className="appointment-date">
                      <span className="day">{new Date(apt.appointmentDate).getDate()}</span>
                      <span className="month">
                        {new Date(apt.appointmentDate).toLocaleString('default', { month: 'short' })}
                      </span>
                    </div>
                    <div className="appointment-details">
                      <h3>Dr. {apt.doctor?.firstName} {apt.doctor?.lastName}</h3>
                      <p>{apt.doctor?.specialization}</p>
                      <p className="time">{apt.startTime} - {apt.endTime}</p>
                    </div>
                    <div className="appointment-status">
                      <span className={`status status-${apt.status}`}>{apt.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No upcoming appointments</p>
                <Link to="/appointments" className="btn btn-primary">Schedule Appointment</Link>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
