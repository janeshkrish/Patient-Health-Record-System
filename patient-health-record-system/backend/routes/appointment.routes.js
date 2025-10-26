const express = require('express');
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  cancelAppointment,
  getAvailableSlots
} = require('../controllers/appointment.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { auditLog } = require('../middleware/audit.middleware');

const router = express.Router();

router.use(protect);

router.get('/available-slots', getAvailableSlots);

router.route('/')
  .get(auditLog('read', 'appointment'), getAppointments)
  .post(auditLog('create', 'appointment'), createAppointment);

router.route('/:id')
  .get(auditLog('read', 'appointment'), getAppointment)
  .put(authorize('admin', 'doctor', 'nurse'), auditLog('update', 'appointment'), updateAppointment);

router.put('/:id/cancel', auditLog('update', 'appointment'), cancelAppointment);

module.exports = router;
