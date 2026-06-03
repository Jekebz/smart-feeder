const { store } = require("./demoStore");
const { persistSensor } = require("../controllers/dashboardController");

function randomAround(base, spread, decimals = 1) {
  return Number((base + (Math.random() * spread * 2 - spread)).toFixed(decimals));
}

function startIotSimulator(io) {
  setInterval(async () => {
    const payload = {
      temperature: randomAround(28, 5),
      humidity: Math.round(randomAround(55, 15, 0)),
      timestamp: new Date(),
    };

    store.resources.food.current = Math.max(0, store.resources.food.current - Math.floor(Math.random() * 8));
    store.resources.water.current = Math.max(0, store.resources.water.current - Math.floor(Math.random() * 10));

    await persistSensor(payload);
    io.emit("sensor_updated", payload);
    io.emit("resource_updated", store.resources);
  }, 5000);
}

module.exports = startIotSimulator;
