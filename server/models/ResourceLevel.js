const mongoose = require("mongoose");

const resourceLevelSchema = new mongoose.Schema(
  {
    foodCurrent: Number,
    foodMax: Number,
    waterCurrent: Number,
    waterMax: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ResourceLevel", resourceLevelSchema);
