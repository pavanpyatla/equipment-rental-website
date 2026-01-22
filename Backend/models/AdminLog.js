const mongoose = require("mongoose");

const adminLogSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    action: {
        type: String, // "APPROVED", "DECLINED", "COMPLETED"
        required: true
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RentalRequest",
        required: true
    },
    targetType: {
        type: String,
        default: "RentalRequest"
    },
    details: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("AdminLog", adminLogSchema);
