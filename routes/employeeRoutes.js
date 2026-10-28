const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// GET: Fetch all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch employees',
      error: err.message
    });
  }
});

// GET: Fetch one employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: 'Employee not found'
      });
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(400).json({
      message: 'Invalid employee ID',
      error: err.message
    });
  }
});

// POST: Add a new employee
router.post('/', async (req, res) => {
  try {
    const { name, email, department, role } = req.body;

    if (!name || !email || !department || !role) {
      return res.status(400).json({
        message: 'Please provide name, email, department and role'
      });
    }

    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(409).json({
        message: 'Employee with this email already exists'
      });
    }

    const employee = new Employee({
      name,
      email,
      department,
      role
    });

    const newEmployee = await employee.save();

    res.status(201).json({
      message: 'Employee added successfully',
      employee: newEmployee
    });

  } catch (err) {
    res.status(400).json({
      message: 'Failed to add employee',
      error: err.message
    });
  }
});

// PUT: Update an employee
router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      message: 'Employee updated successfully',
      employee: updatedEmployee
    });

  } catch (err) {
    res.status(400).json({
      message: 'Failed to update employee',
      error: err.message
    });
  }
});

// DELETE: Remove an employee
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(
      req.params.id
    );

    if (!deletedEmployee) {
      return res.status(404).json({
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      message: 'Employee deleted successfully'
    });

  } catch (err) {
    res.status(400).json({
      message: 'Failed to delete employee',
      error: err.message
    });
  }
});

module.exports = router;