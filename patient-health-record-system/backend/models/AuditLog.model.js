const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'login',
      'logout',
      'create',
      'read',
      'update',
      'delete',
      'access_denied'
    ]
  },
  resource: {
    type: String,
    required: true,
    enum: [
      'patient',
      'health_record',
      'prescription',
      'lab_result',
      'appointment',
      'user'
    ]
  },
  resourceId: mongoose.Schema.Types.ObjectId,
  details: {
    type: String,
    maxlength: 1000
  },
  ipAddress: String,
  userAgent: String,
  status: {
    type: String,
    enum: ['success', 'failure'],
    default: 'success'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

// Index for audit queries
AuditLogSchema.index({ user: 1, timestamp: -1 });
AuditLogSchema.index({ resource: 1, resourceId: 1 });
AuditLogSchema.index({ timestamp: -1 });

// Auto-delete old logs after 2 years (retention policy)
AuditLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 63072000 });

module.exports = mongoose.model('AuditLog', AuditLogSchema);
