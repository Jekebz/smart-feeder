const mongoose = require("mongoose");

const healthLogSchema = new mongoose.Schema(
  {
    weight: Number,
    foodConsumption: Number,
    waterConsumption: Number,
    feedingFrequency: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthLog", healthLogSchema);
