const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.log("MONGO_URI not set. Using in-memory demo data.");
    return false;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.log(`MongoDB unavailable (${error.message}). Using in-memory demo data.`);
    return false;
  }
}

module.exports = connectDB;
