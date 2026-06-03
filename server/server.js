require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDB = require("./config/db");
const registerSockets = require("./sockets");
const startIotSimulator = require("./services/iotSimulator");
const { seedMemory } = require("./services/demoStore");

const port = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true },
});

app.set("io", io);
registerSockets(io);

(async () => {
  global.mongoReady = await connectDB();
  await seedMemory();
  startIotSimulator(io);
  server.listen(port, () => {
    console.log(`Smart Feeder API running at http://localhost:${port}`);
    console.log(`Swagger docs at http://localhost:${port}/api/docs`);
  });
})();
