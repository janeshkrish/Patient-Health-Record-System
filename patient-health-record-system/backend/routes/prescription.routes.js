const express = require('express');
const {
  getPrescriptions,
  getPrescription,
  createPrescription,
  updatePrescription,
  dispensePrescription
} = require('../controllers/prescription.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { auditLog } = require('../middleware/audit.middleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(auditLog('read', 'prescription'), getPrescriptions)
  .post(authorize('doctor'), auditLog('create', 'prescription'), createPrescription);

router.route('/:id')
  .get(auditLog('read', 'prescription'), getPrescription)
  .put(authorize('doctor'), auditLog('update', 'prescription'), updatePrescription);

router.put('/:id/dispense', authorize('admin'), auditLog('update', 'prescription'), dispensePrescription);

module.exports = router;
