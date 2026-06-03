const express = require("express");
const { getResources } = require("../controllers/dashboardController");
const router = express.Router();

/**
 * @openapi
 * /resources:
 *   get:
 *     tags: [Resources]
 *     summary: Get food and water levels
 *     responses:
 *       200: { description: Resource levels }
 */
router.get("/", getResources);

module.exports = router;
