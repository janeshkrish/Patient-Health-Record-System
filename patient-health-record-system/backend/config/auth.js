module.exports = {
  roles: {
    ADMIN: 'admin',
    DOCTOR: 'doctor',
    NURSE: 'nurse',
    PATIENT: 'patient',
    LAB_TECH: 'lab_tech'
  },
  permissions: {
    admin: ['*'], // All permissions
    doctor: [
      'read:patients',
      'write:patients',
      'read:health_records',
      'write:health_records',
      'read:prescriptions',
      'write:prescriptions',
      'read:lab_results',
      'write:appointments',
      'read:appointments'
    ],
    nurse: [
      'read:patients',
      'read:health_records',
      'write:health_records',
      'read:prescriptions',
      'read:appointments',
      'write:appointments'
    ],
    patient: [
      'read:own_records',
      'read:own_prescriptions',
      'read:own_lab_results',
      'read:own_appointments',
      'write:own_appointments'
    ],
    lab_tech: [
      'read:patients',
      'read:lab_results',
      'write:lab_results'
    ]
  }
};
