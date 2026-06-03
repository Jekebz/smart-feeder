const express = require("express");
const { feed } = require("../controllers/dashboardController");
const router = express.Router();

/**
 * @openapi
 * /feed:
 *   post:
 *     tags: [Feed]
 *     summary: Dispense food immediately
 *     responses:
 *       200: { description: Food dispensed and history stored }
 */
router.post("/", feed);

module.exports = router;
