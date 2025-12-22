const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const AdminLog = require("../models/AdminLog");
const User = require("../models/User");

// Middleware to ensure admin
const adminCheck = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Server error during admin check" });
    }
};

/* ================= GET ALL LOGS ================= */
router.get("/logs", authMiddleware, adminCheck, async (req, res) => {
    try {
        const logs = await AdminLog.find()
            .populate("adminId", "name email")
            .sort({ timestamp: -1 });
        res.json(logs);
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ message: "Failed to fetch logs" });
    }
});

module.exports = router;
