const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    breed: String,
    age: Number,
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", petSchema);
