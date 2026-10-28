const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Employee name is required'],
      trim: true
    },

    email: {
      type: String,
      required: [true, 'Employee email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },

    department: {
      type: String,
      required: [true, 'Department is required'],
      trim: true
    },

    role: {
      type: String,
      required: [true, 'Employee role is required'],
      trim: true
    },

    dateJoined: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Employee', employeeSchema);