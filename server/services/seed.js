require("dotenv").config();
const bcrypt = require("bcrypt");
const connectDB = require("../config/db");
const User = require("../models/User");
const Pet = require("../models/Pet");
const FeedingSchedule = require("../models/FeedingSchedule");
const FeedingHistory = require("../models/FeedingHistory");
const SensorReading = require("../models/SensorReading");
const ResourceLevel = require("../models/ResourceLevel");
const HealthLog = require("../models/HealthLog");
const { seedMemory } = require("./demoStore");

async function seed() {
  const mongoReady = await connectDB();
  if (!mongoReady) {
    await seedMemory();
    console.log("Seeded in-memory demo user: ria@example.com / password123");
    return;
  }

  await Promise.all([
    User.deleteMany({}),
    Pet.deleteMany({}),
    FeedingSchedule.deleteMany({}),
    FeedingHistory.deleteMany({}),
    SensorReading.deleteMany({}),
    ResourceLevel.deleteMany({}),
    HealthLog.deleteMany({}),
  ]);

  const user = await User.create({
    name: "Ria",
    email: "ria@example.com",
    password: await bcrypt.hash("password123", 10),
  });

  await Pet.create({ name: "Jowok", type: "Cat", breed: "Orange Tabby", age: 2, image: "/uploads/cat-avatar.svg" });
  await FeedingSchedule.insertMany([
    { mealName: "Breakfast", time: "10:00 AM", enabled: true, status: "Completed" },
    { mealName: "Lunch", time: "01:00 PM", enabled: true, status: "Upcoming" },
    { mealName: "Dinner", time: "07:00 PM", enabled: true, status: "Upcoming" },
  ]);
  await FeedingHistory.create({ mealName: "Breakfast", amount: 120, user: user._id, timestamp: new Date("2026-05-21T10:00:00") });
  await SensorReading.insertMany([
    { temperature: 20.1, humidity: 20 },
    { temperature: 19.5, humidity: 22 },
    { temperature: 22, humidity: 18 },
    { temperature: 34, humidity: 35 },
    { temperature: 30, humidity: 42 },
    { temperature: 29.4, humidity: 68 },
    { temperature: 28.7, humidity: 55 },
  ]);
  await ResourceLevel.create({ foodCurrent: 500, foodMax: 3000, waterCurrent: 1500, waterMax: 3000 });
  await HealthLog.create({ weight: 4.2, foodConsumption: 500, waterConsumption: 1500, feedingFrequency: 3 });
  console.log("MongoDB seeded. Login with ria@example.com / password123");
}

seed().finally(() => process.exit(0));
