const mongoose = require("mongoose");

const feedingHistorySchema = new mongoose.Schema(
  {
    mealName: { type: String, default: "Manual Feed" },
    timestamp: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeedingHistory", feedingHistorySchema);
