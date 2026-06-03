const express = require("express");
const { getPet } = require("../controllers/dashboardController");
const router = express.Router();

/**
 * @openapi
 * /pet:
 *   get:
 *     tags: [Pet]
 *     summary: Get the active pet profile
 *     responses:
 *       200: { description: Pet profile }
 */
router.get("/", getPet);

module.exports = router;
