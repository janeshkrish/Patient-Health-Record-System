const express = require('express');
const {
  getLabResults,
  getLabResult,
  createLabResult,
  updateLabResult,
  approveLabResult
} = require('../controllers/labResult.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { auditLog } = require('../middleware/audit.middleware');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(auditLog('read', 'lab_result'), getLabResults)
  .post(authorize('doctor', 'lab_tech'), auditLog('create', 'lab_result'), createLabResult);

router.route('/:id')
  .get(auditLog('read', 'lab_result'), getLabResult)
  .put(authorize('lab_tech'), auditLog('update', 'lab_result'), updateLabResult);

router.put('/:id/approve', authorize('doctor'), auditLog('update', 'lab_result'), approveLabResult);

module.exports = router;
