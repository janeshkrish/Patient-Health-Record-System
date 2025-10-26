const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  prescriptionNumber: {
    type: String,
    required: true,
    unique: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  healthRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthRecord'
  },
  medications: [{
    drugName: {
      type: String,
      required: true
    },
    genericName: String,
    dosage: {
      type: String,
      required: true
    },
    frequency: {
      type: String,
      required: true
    },
    duration: {
      value: Number,
      unit: {
        type: String,
        enum: ['days', 'weeks', 'months']
      }
    },
    instructions: String,
    quantity: Number,
    refills: {
      type: Number,
      default: 0
    }
  }],
  diagnosis: String,
  notes: String,
  validFrom: {
    type: Date,
    default: Date.now
  },
  validUntil: Date,
  status: {
    type: String,
    enum: ['active', 'dispensed', 'expired', 'cancelled'],
    default: 'active'
  },
  dispensedBy: {
    pharmacy: String,
    pharmacist: String,
    dispensedDate: Date
  }
}, {
  timestamps: true
});

// Generate prescription number
PrescriptionSchema.pre('save', async function(next) {
  if (!this.prescriptionNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const count = await this.constructor.countDocuments();
    this.prescriptionNumber = `RX${year}${month}${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
