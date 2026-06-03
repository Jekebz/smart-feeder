require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/healthcheck", (_req, res) => res.json({ ok: true, service: "smart-feeder-api" }));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/pet", require("./routes/petRoutes"));
app.use("/api/sensors", require("./routes/sensorRoutes"));
app.use("/api/resources", require("./routes/resourceRoutes"));
app.use("/api/feed", require("./routes/feedRoutes"));
app.use("/api/schedules", require("./routes/scheduleRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));
app.use("/api/health", require("./routes/healthRoutes"));
app.use("/api/camera", require("./routes/cameraRoutes"));

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || "Server error" });
});

module.exports = app;
