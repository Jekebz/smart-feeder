const mongoose = require("mongoose");

const feedingScheduleSchema = new mongoose.Schema(
  {
    mealName: { type: String, required: true },
    time: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    status: { type: String, enum: ["Completed", "Upcoming", "Missed"], default: "Upcoming" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FeedingSchedule", feedingScheduleSchema);
