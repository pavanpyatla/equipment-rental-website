const express = require("express");
const RentalRequest = require("../models/RentalRequest");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

/* ================= CREATE RENTAL REQUEST ================= */
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const {
      category,
      equipment,
      location,
      startDate,
      endDate,
      duration,
      fullName,
      phone,
      email,
      notes
    } = req.body;

    // Validation
    if (!equipment || !location || !startDate || !endDate || !duration || !fullName || !phone) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    // Create rental request with user ID from auth middleware
    const rental = await RentalRequest.create({
      userId: req.userId,
      category: category || "Construction Equipment",
      equipment,
      location,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      duration,
      fullName,
      phone,
      email,
      notes
    });

    res.status(201).json({
      message: "Rental request submitted successfully",
      rental
    });
  } catch (error) {
    console.error("Create rental error:", error);
    res.status(500).json({
      message: "Failed to save rental request",
      error: error.message
    });
  }
});

/* ================= GET ALL RENTAL REQUESTS ================= */
router.get("/", async (req, res) => {
  try {
    const rentals = await RentalRequest.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(rentals);
  } catch (error) {
    console.error("Get rentals error:", error);
    res.status(500).json({
      message: "Failed to fetch rental requests"
    });
  }
});

/* ================= GET USER'S RENTAL REQUESTS ================= */
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const rentals = await RentalRequest.find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json(rentals);
  } catch (error) {
    console.error("Get user rentals error:", error);
    res.status(500).json({
      message: "Failed to fetch your rental requests"
    });
  }
});

/* ================= UPDATE RENTAL STATUS (ADMIN) ================= */
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Check if user is admin
    const user = await require("../models/User").findById(req.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    if (!["approved", "declined", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedRental = await RentalRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRental) {
      return res.status(404).json({ message: "Rental request not found" });
    }

    // Log the action
    const AdminLog = require("../models/AdminLog");
    await AdminLog.create({
      adminId: req.userId,
      action: status.toUpperCase(), // "APPROVED", "DECLINED", etc.
      targetId: updatedRental._id,
      targetType: "RentalRequest",
      details: `Changed status to ${status} for rental of ${updatedRental.equipment}`
    });

    res.json({
      message: `Rental request ${status} successfully`,
      rental: updatedRental
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;
