const mongoose = require("mongoose");

const sensorReadingSchema = new mongoose.Schema(
  {
    temperature: Number,
    humidity: Number,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SensorReading", sensorReadingSchema);
