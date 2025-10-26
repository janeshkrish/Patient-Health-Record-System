const express = require('express');
const {
  getHealthRecords,
  getHealthRecord,
  createHealthRecord,
  updateHealthRecord,
  deleteHealthRecord,
  uploadDocument
} = require('../controllers/healthRecord.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { canAccessPatient } = require('../middleware/rbac.middleware');
const { auditLog } = require('../middleware/audit.middleware');
const upload = require('../utils/fileUpload');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(auditLog('read', 'health_record'), getHealthRecords)
  .post(authorize('doctor', 'nurse'), auditLog('create', 'health_record'), createHealthRecord);

router.route('/:id')
  .get(canAccessPatient, auditLog('read', 'health_record'), getHealthRecord)
  .put(authorize('doctor', 'nurse'), auditLog('update', 'health_record'), updateHealthRecord)
  .delete(authorize('admin', 'doctor'), auditLog('delete', 'health_record'), deleteHealthRecord);

router.post('/:id/upload', authorize('doctor', 'nurse'), upload.single('document'), uploadDocument);

module.exports = router;
