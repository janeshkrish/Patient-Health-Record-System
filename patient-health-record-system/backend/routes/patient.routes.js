const express = require('express');
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient
} = require('../controllers/patient.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { checkPermission, canAccessPatient } = require('../middleware/rbac.middleware');
const { auditLog } = require('../middleware/audit.middleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(authorize('admin', 'doctor', 'nurse'), auditLog('read', 'patient'), getPatients)
  .post(authorize('admin', 'doctor', 'nurse'), auditLog('create', 'patient'), createPatient);

router.route('/:id')
  .get(canAccessPatient, auditLog('read', 'patient'), getPatient)
  .put(authorize('admin', 'doctor', 'nurse'), auditLog('update', 'patient'), updatePatient)
  .delete(authorize('admin'), auditLog('delete', 'patient'), deletePatient);

module.exports = router;
