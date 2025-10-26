import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import { FaSearch, FaPlus, FaEye } from 'react-icons/fa';
import patientService from '../../services/patient.service';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPatients();
  }, [searchTerm, currentPage]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await patientService.getAll({
        search: searchTerm,
        page: currentPage,
        limit: 10
      });
      setPatients(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-content">
        <Sidebar />
        <main className="main-content">
          <div className="page-header">
            <h1>Patients</h1>
            <Link to="/patients/new" className="btn btn-primary">
              <FaPlus /> Add New Patient
            </Link>
          </div>

          <div className="search-section">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : patients.length > 0 ? (
            <>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Patient ID</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Age</th>
                      <th>Blood Group</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((patient) => (
                      <tr key={patient._id}>
                        <td><strong>{patient.patientId}</strong></td>
                        <td>{patient.firstName} {patient.lastName}</td>
                        <td>{patient.gender}</td>
                        <td>
                          {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()}
                        </td>
                        <td>{patient.bloodGroup || 'N/A'}</td>
                        <td>{patient.phone}</td>
                        <td>
                          <span className={`status status-${patient.status}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/patients/${patient._id}`}
                            className="btn btn-sm btn-outline"
                          >
                            <FaEye /> View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="btn btn-outline"
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="btn btn-outline"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>No patients found</p>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PatientList;
