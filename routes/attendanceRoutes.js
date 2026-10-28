const express = require("express");
const router = express.Router();

const Attendance = require("../models/attendance");
const Employee = require("../models/Employee");

// GET all attendance records
router.get("/", async (req, res) => {
    try {
        const records = await Attendance.find()
            .populate("employeeId", "name email department role")
            .sort({ date: -1 });

        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST: Mark attendance
router.post("/", async (req, res) => {
    try {
        const { employeeId, date, status } = req.body;

        if (!employeeId || !status) {
            return res.status(400).json({
                message: "Employee ID and attendance status are required"
            });
        }

        if (!["Present", "Absent", "Late"].includes(status)) {
            return res.status(400).json({
                message: "Invalid attendance status"
            });
        }

        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        const attendance = new Attendance({
            employeeId,
            date: date || Date.now(),
            status
        });

        const savedAttendance = await attendance.save();

        res.status(201).json({
            message: "Attendance marked successfully",
            attendance: savedAttendance
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET attendance of a particular employee
router.get("/employee/:employeeId", async (req, res) => {
    try {
        const records = await Attendance.find({
            employeeId: req.params.employeeId
        })
        .populate("employeeId", "name email department role")
        .sort({ date: -1 });

        res.status(200).json(records);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE attendance
router.put("/:id", async (req, res) => {
    try {
        const { status, date } = req.body;

        if (status && !["Present", "Absent", "Late"].includes(status)) {
            return res.status(400).json({
                message: "Invalid attendance status"
            });
        }

        const updatedAttendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            { status, date },
            { new: true, runValidators: true }
        );

        if (!updatedAttendance) {
            return res.status(404).json({
                message: "Attendance record not found"
            });
        }

        res.status(200).json({
            message: "Attendance updated successfully",
            attendance: updatedAttendance
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE attendance
router.delete("/:id", async (req, res) => {
    try {
        const deletedAttendance = await Attendance.findByIdAndDelete(
            req.params.id
        );

        if (!deletedAttendance) {
            return res.status(404).json({
                message: "Attendance record not found"
            });
        }

        res.status(200).json({
            message: "Attendance deleted successfully"
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;