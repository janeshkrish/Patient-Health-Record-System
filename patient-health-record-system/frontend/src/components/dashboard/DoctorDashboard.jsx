import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import { FaUsers, FaCalendar, FaPrescription, FaFlask } from 'react-icons/fa';
import api from '../../services/api';

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    totalPatients: 0,
    pendingPrescriptions: 0,
    pendingLabResults: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const today = new Date().toISOString().split('T');
      const [appointmentsRes, patientsRes] = await Promise.all([
        api.get(`/appointments?date=${today}`),
        api.get('/patients')
      ]);

      setStats({
        todayAppointments: appointmentsRes.data.count || 0,
        totalPatients: patientsRes.data.count || 0,
        pendingPrescriptions: 0,
        pendingLabResults: 0
      });

      setRecentAppointments(appointmentsRes.data.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <h1>Doctor Dashboard</h1>
            <p>Welcome back! Here's what's happening today.</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card stat-primary">
              <FaCalendar className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.todayAppointments}</h3>
                <p>Today's Appointments</p>
              </div>
            </div>

            <div className="stat-card stat-success">
              <FaUsers className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.totalPatients}</h3>
                <p>Total Patients</p>
              </div>
            </div>

            <div className="stat-card stat-warning">
              <FaPrescription className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.pendingPrescriptions}</h3>
                <p>Pending Prescriptions</p>
              </div>
            </div>

            <div className="stat-card stat-info">
              <FaFlask className="stat-icon" />
              <div className="stat-info">
                <h3>{stats.pendingLabResults}</h3>
                <p>Pending Lab Results</p>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2>Today's Appointments</h2>
              <Link to="/appointments" className="btn btn-sm btn-primary">View All</Link>
            </div>

            {loading ? (
              <p>Loading...</p>
            ) : recentAppointments.length > 0 ? (
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Patient</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAppointments.map((apt) => (
                      <tr key={apt._id}>
                        <td>{apt.startTime}</td>
                        <td>{apt.patient?.firstName} {apt.patient?.lastName}</td>
                        <td><span className="badge">{apt.type}</span></td>
                        <td><span className={`status status-${apt.status}`}>{apt.status}</span></td>
                        <td>
                          <Link to={`/appointments/${apt._id}`} className="btn btn-sm btn-outline">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <p>No appointments scheduled for today</p>
              </div>
            )}
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-grid">
              <Link to="/patients" className="action-card">
                <FaUsers />
                <span>View Patients</span>
              </Link>
              <Link to="/health-records" className="action-card">
                <FaPrescription />
                <span>Create Record</span>
              </Link>
              <Link to="/prescriptions" className="action-card">
                <FaPrescription />
                <span>Write Prescription</span>
              </Link>
              <Link to="/appointments" className="action-card">
                <FaCalendar />
                <span>Schedule Appointment</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
