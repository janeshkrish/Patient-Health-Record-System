const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  appointmentNumber: {
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
  appointmentDate: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 30 // minutes
  },
  type: {
    type: String,
    enum: ['consultation', 'follow_up', 'procedure', 'emergency'],
    default: 'consultation'
  },
  reason: {
    type: String,
    required: true
  },
  symptoms: [String],
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'],
    default: 'scheduled'
  },
  notes: String,
  healthRecord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthRecord'
  },
  reminders: [{
    sentAt: Date,
    type: {
      type: String,
      enum: ['email', 'sms']
    }
  }],
  cancellationReason: String,
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Generate appointment number
AppointmentSchema.pre('save', async function(next) {
  if (!this.appointmentNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const count = await this.constructor.countDocuments();
    this.appointmentNumber = `APT${year}${month}${String(count + 1).padStart(5, '0')}`;
  }
  next();
});

// Index for scheduling queries
AppointmentSchema.index({ doctor: 1, appointmentDate: 1, startTime: 1 });
AppointmentSchema.index({ patient: 1, appointmentDate: -1 });

module.exports = mongoose.model('Appointment', AppointmentSchema);
