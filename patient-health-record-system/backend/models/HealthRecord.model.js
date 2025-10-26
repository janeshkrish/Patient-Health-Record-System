const mongoose = require('mongoose');

const HealthRecordSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  recordType: {
    type: String,
    enum: ['consultation', 'diagnosis', 'treatment', 'vitals', 'notes'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vitals: {
    temperature: Number, // in Celsius
    bloodPressure: {
      systolic: Number,
      diastolic: Number
    },
    heartRate: Number, // bpm
    respiratoryRate: Number,
    oxygenSaturation: Number, // percentage
    weight: Number, // in kg
    height: Number, // in cm
    bmi: Number
  },
  chiefComplaint: String,
  symptoms: [String],
  diagnosis: {
    primary: String,
    secondary: [String],
    icdCode: String
  },
  treatment: {
    plan: String,
    procedures: [String],
    recommendations: [String]
  },
  notes: {
    type: String,
    maxlength: 5000
  },
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadDate: Date
  }],
  followUpDate: Date,
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  isEncrypted: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for faster queries
HealthRecordSchema.index({ patient: 1, date: -1 });
HealthRecordSchema.index({ doctor: 1 });

module.exports = mongoose.model('HealthRecord', HealthRecordSchema);
