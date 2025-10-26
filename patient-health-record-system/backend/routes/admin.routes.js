const express = require('express');
const {
  getAllUsers,
  getUser,
  updateUserRole,
  deactivateUser,
  activateUser,
  getSystemStats
} = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth.middleware');
const { auditLog } = require('../middleware/audit.middleware');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getSystemStats);
router.get('/users', auditLog('read', 'user'), getAllUsers);
router.get('/users/:id', auditLog('read', 'user'), getUser);
router.put('/users/:id/role', auditLog('update', 'user'), updateUserRole);
router.put('/users/:id/deactivate', auditLog('update', 'user'), deactivateUser);
router.put('/users/:id/activate', auditLog('update', 'user'), activateUser);

module.exports = router;
