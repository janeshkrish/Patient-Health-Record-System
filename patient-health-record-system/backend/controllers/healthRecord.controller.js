const HealthRecord = require('../models/HealthRecord.model');
const Patient = require('../models/Patient.model');

exports.getHealthRecords = async (req, res) => {
  try {
    const { patientId, recordType, startDate, endDate } = req.query;
    let query = {};

    if (patientId) query.patient = patientId;
    if (recordType) query.recordType = recordType;
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    // Patients can only see their own records
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ user: req.user._id });
      if (patient) query.patient = patient._id;
    }

    const records = await HealthRecord.find(query)
      .populate('patient', 'firstName lastName patientId')
      .populate('doctor', 'firstName lastName specialization')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getHealthRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id)
      .populate('patient', 'firstName lastName patientId dateOfBirth gender')
      .populate('doctor', 'firstName lastName specialization');

    if (!record) {
      return res.status(404).json({ success: false, error: 'Health record not found' });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createHealthRecord = async (req, res) => {
  try {
    req.body.doctor = req.user._id;
    const record = await HealthRecord.create(req.body);

    res.status(201).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateHealthRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!record) {
      return res.status(404).json({ success: false, error: 'Health record not found' });
    }

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteHealthRecord = async (req, res) => {
  try {
    const record = await HealthRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ success: false, error: 'Health record not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ success: false, error: 'Health record not found' });
    }

    const document = {
      name: req.file.originalname,
      type: req.file.mimetype,
      url: `/uploads/${req.user.role}/${req.file.filename}`,
      uploadDate: Date.now()
    };

    record.documents.push(document);
    await record.save();

    res.status(200).json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
