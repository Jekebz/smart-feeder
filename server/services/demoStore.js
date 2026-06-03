const bcrypt = require("bcrypt");

const store = {
  users: [],
  pet: { name: "Jowok", type: "Cat", avatar: "/uploads/cat-avatar.svg", breed: "Orange Tabby", age: 2 },
  temperature: [20.1, 19.5, 22, 34, 30, 29.4, 28.7],
  humidity: [20, 22, 18, 35, 42, 68, 55],
  resources: { food: { current: 500, max: 3000 }, water: { current: 1500, max: 3000 } },
  schedules: [
    { id: "sch-1", mealName: "Breakfast", time: "10:00 AM", enabled: true, status: "Completed" },
    { id: "sch-2", mealName: "Lunch", time: "01:00 PM", enabled: true, status: "Upcoming" },
    { id: "sch-3", mealName: "Dinner", time: "07:00 PM", enabled: true, status: "Upcoming" },
  ],
  history: [],
  health: [{ id: "health-1", weight: 4.2, foodConsumption: 500, waterConsumption: 1500, feedingFrequency: 3 }],
};

async function seedMemory() {
  if (!store.users.length) {
    store.users.push({
      id: "user-1",
      name: "Ria",
      email: "ria@example.com",
      password: await bcrypt.hash("password123", 10),
    });
  }
  return store;
}

function nextId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

module.exports = { store, seedMemory, nextId };
