const AuditLog = require('../models/AuditLog.model');

exports.getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50, action, resource, startDate, endDate } = req.query;
    let query = {};

    if (action) query.action = action;
    if (resource) query.resource = resource;
    if (startDate && endDate) {
      query.timestamp = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const logs = await AuditLog.find(query)
      .populate('user', 'firstName lastName email role')
      .sort({ timestamp: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await AuditLog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: logs.length,
      total: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: logs
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAuditLogsByUser = async (req, res) => {
  try {
    const logs = await AuditLog.find({ user: req.params.userId })
      .sort({ timestamp: -1 })
      .limit(100);

    res.status(200).json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAuditLogsByResource = async (req, res) => {
  try {
    const { resource, resourceId } = req.params;
    const logs = await AuditLog.find({ resource, resourceId })
      .populate('user', 'firstName lastName email role')
      .sort({ timestamp: -1 });

    res.status(200).json({ success: true, count: logs.length, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
