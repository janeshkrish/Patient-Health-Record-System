const { permissions } = require('../config/auth');

// Check specific permission
exports.checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userPermissions = permissions[userRole] || [];

    // Admin has all permissions
    if (userPermissions.includes('*')) {
      return next();
    }

    // Check if user has required permission
    if (!userPermissions.includes(requiredPermission)) {
      return res.status(403).json({
        success: false,
        error: 'You do not have permission to perform this action'
      });
    }

    next();
  };
};

// Check if user can access patient data
exports.canAccessPatient = async (req, res, next) => {
  const { patientId } = req.params;
  const userRole = req.user.role;

  // Admin, doctor, and nurse can access all patients
  if (['admin', 'doctor', 'nurse', 'lab_tech'].includes(userRole)) {
    return next();
  }

  // Patient can only access their own data
  if (userRole === 'patient') {
    const Patient = require('../models/Patient.model');
    const patient = await Patient.findById(patientId);
    
    if (!patient || patient.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        error: 'You can only access your own records'
      });
    }
  }

  next();
};
