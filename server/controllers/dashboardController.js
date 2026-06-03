const FeedingHistory = require("../models/FeedingHistory");
const FeedingSchedule = require("../models/FeedingSchedule");
const HealthLog = require("../models/HealthLog");
const Pet = require("../models/Pet");
const ResourceLevel = require("../models/ResourceLevel");
const SensorReading = require("../models/SensorReading");
const { store, nextId } = require("../services/demoStore");

exports.getPet = async (_req, res) => {
  if (global.mongoReady) {
    const pet = await Pet.findOne();
    if (!pet) return res.json(store.pet);
    return res.json({ name: pet.name, type: pet.type, avatar: pet.image, breed: pet.breed, age: pet.age });
  }
  res.json(store.pet);
};

exports.getTemperature = async (_req, res) => res.json({ labels: ["02 AM", "04 AM", "08 AM", "12 PM", "02 PM", "04 PM", "08 PM"], values: store.temperature });

exports.getHumidity = async (_req, res) => res.json({ labels: ["02 AM", "04 AM", "08 AM", "12 PM", "02 PM", "04 PM", "08 PM"], values: store.humidity });

exports.getResources = async (_req, res) => {
  if (global.mongoReady) {
    const latest = await ResourceLevel.findOne().sort({ createdAt: -1 });
    if (!latest) return res.json(store.resources);
    return res.json({
      food: { current: latest.foodCurrent, max: latest.foodMax },
      water: { current: latest.waterCurrent, max: latest.waterMax },
    });
  }
  res.json(store.resources);
};

exports.feed = async (req, res) => {
  const amount = Number(process.env.FEED_AMOUNT_ML || 120);
  const history = { id: nextId("feed"), mealName: "Manual Feed", amount, timestamp: new Date(), user: req.user?.id };
  if (global.mongoReady) {
    await FeedingHistory.create({ mealName: history.mealName, amount, user: req.user?._id });
  } else {
    store.history.unshift(history);
  }
  store.resources.food.current = Math.max(0, store.resources.food.current - amount);
  req.app.get("io")?.emit("feed_triggered", { success: true, amount, timestamp: history.timestamp });
  req.app.get("io")?.emit("resource_updated", store.resources);
  res.json({ success: true, message: "Food dispensed" });
};

exports.getSchedules = async (_req, res) => {
  if (global.mongoReady) return res.json(await FeedingSchedule.find().sort({ time: 1 }));
  res.json(store.schedules);
};

exports.createSchedule = async (req, res) => {
  if (global.mongoReady) return res.status(201).json(await FeedingSchedule.create(req.body));
  const schedule = { id: nextId("sch"), enabled: true, status: "Upcoming", ...req.body };
  store.schedules.push(schedule);
  res.status(201).json(schedule);
};

exports.updateSchedule = async (req, res) => {
  if (global.mongoReady) return res.json(await FeedingSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true }));
  const index = store.schedules.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: "Schedule not found" });
  store.schedules[index] = { ...store.schedules[index], ...req.body };
  res.json(store.schedules[index]);
};

exports.deleteSchedule = async (req, res) => {
  if (global.mongoReady) {
    await FeedingSchedule.findByIdAndDelete(req.params.id);
    return res.status(204).end();
  }
  store.schedules = store.schedules.filter((item) => item.id !== req.params.id);
  res.status(204).end();
};

exports.getHistory = async (_req, res) => {
  if (global.mongoReady) return res.json(await FeedingHistory.find().sort({ timestamp: -1 }).limit(50));
  res.json(store.history);
};

exports.getHealth = async (_req, res) => {
  if (global.mongoReady) return res.json(await HealthLog.find().sort({ createdAt: -1 }).limit(30));
  res.json(store.health);
};

exports.createHealth = async (req, res) => {
  if (global.mongoReady) return res.status(201).json(await HealthLog.create(req.body));
  const log = { id: nextId("health"), ...req.body };
  store.health.unshift(log);
  res.status(201).json(log);
};

exports.getCamera = async (_req, res) => res.json({ streamUrl: "/uploads/demo-camera.mp4", status: "online" });

exports.persistSensor = async ({ temperature, humidity }) => {
  store.temperature.push(temperature);
  store.humidity.push(humidity);
  store.temperature = store.temperature.slice(-7);
  store.humidity = store.humidity.slice(-7);
  if (global.mongoReady) await SensorReading.create({ temperature, humidity });
};
