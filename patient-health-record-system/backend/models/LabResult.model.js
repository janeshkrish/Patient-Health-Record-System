const mongoose = require('mongoose');

const LabResultSchema = new mongoose.Schema({
  resultId: {
    type: String,
    required: true,
    unique: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  orderedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testType: {
    type: String,
    required: true,
    enum: [
      'blood_test',
      'urine_test',
      'imaging',
      'biopsy',
      'culture',
      'genetic',
      'other'
    ]
  },
  testName: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  sampleCollectionDate: Date,
  resultDate: Date,
  results: [{
    parameter: String,
    value: String,
    unit: String,
    normalRange: String,
    flag: {
      type: String,
      enum: ['normal', 'low', 'high', 'critical']
    }
  }],
  overallResult: {
    type: String,
    enum: ['normal', 'abnormal', 'pending', 'inconclusive']
  },
  interpretation: String,
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  documents: [{
    name: String,
    type: String,
    url: String
  }],
  notes: String,
  status: {
    type: String,
    enum: ['ordered', 'in_progress', 'completed', 'cancelled'],
    default: 'ordered'
  },
  priority: {
    type: String,
    enum: ['routine', 'urgent', 'stat'],
    default: 'routine'
  }
}, {
  timestamps: true
});

// Generate result ID
LabResultSchema.pre('save', async function(next) {
  if (!this.resultId) {
    const date = new Date();
    const year = date.getFullYear();
    const count = await this.constructor.countDocuments();
    this.resultId = `LAB${year}${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('LabResult', LabResultSchema);
