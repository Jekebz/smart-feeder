const express = require("express");
const { createHealth, getHealth } = require("../controllers/dashboardController");
const router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: List pet health logs
 *     responses:
 *       200: { description: Health logs }
 */
router.get("/", getHealth);

/**
 * @openapi
 * /health:
 *   post:
 *     tags: [Health]
 *     summary: Create a pet health log
 *     responses:
 *       201: { description: Health log created }
 */
router.post("/", createHealth);

module.exports = router;
