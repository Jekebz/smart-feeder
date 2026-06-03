const express = require("express");
const { getHistory } = require("../controllers/dashboardController");
const router = express.Router();

/**
 * @openapi
 * /history:
 *   get:
 *     tags: [History]
 *     summary: List feeding history
 *     responses:
 *       200: { description: History list }
 */
router.get("/", getHistory);

module.exports = router;
