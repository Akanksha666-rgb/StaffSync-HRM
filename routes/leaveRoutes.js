const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');

// GET all leave requests
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employeeId', 'name email department');
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new leave request
router.post('/', async (req, res) => {
  const leave = new Leave({
    employeeId: req.body.employeeId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reason: req.body.reason
  });

  try {
    const newLeave = await leave.save();
    res.status(201).json(newLeave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// UPDATE an employee
router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an employee
router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;