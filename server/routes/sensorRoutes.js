const express = require("express");
const { getHumidity, getTemperature } = require("../controllers/dashboardController");
const router = express.Router();

/**
 * @openapi
 * /sensors/temperature:
 *   get:
 *     tags: [Sensors]
 *     summary: Get temperature chart readings
 *     responses:
 *       200: { description: Temperature readings }
 */
router.get("/temperature", getTemperature);

/**
 * @openapi
 * /sensors/humidity:
 *   get:
 *     tags: [Sensors]
 *     summary: Get humidity chart readings
 *     responses:
 *       200: { description: Humidity readings }
 */
router.get("/humidity", getHumidity);

module.exports = router;
