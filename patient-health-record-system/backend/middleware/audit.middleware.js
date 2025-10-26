const AuditLog = require('../models/AuditLog.model');

// Log all data access and modifications
exports.auditLog = (action, resource) => {
  return async (req, res, next) => {
    // Store original json method
    const originalJson = res.json.bind(res);

    // Override json method
    res.json = async (data) => {
      try {
        // Only log if request was successful
        if (data.success !== false) {
          const log = new AuditLog({
            user: req.user._id,
            action,
            resource,
            resourceId: req.params.id || req.params.patientId || data.data?._id,
            details: `${action} ${resource}`,
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.get('user-agent'),
            status: 'success'
          });

          await log.save();
        }
      } catch (error) {
        console.error('Audit log error:', error);
      }

      // Call original json method
      return originalJson(data);
    };

    next();
  };
};

// Log failed access attempts
exports.logAccessDenied = async (req, res, next) => {
  try {
    if (req.user) {
      await AuditLog.create({
        user: req.user._id,
        action: 'access_denied',
        resource: req.baseUrl.split('/') || 'unknown',
        details: `Unauthorized access attempt to ${req.originalUrl}`,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
        status: 'failure'
      });
    }
  } catch (error) {
    console.error('Audit log error:', error);
  }
  next();
};
