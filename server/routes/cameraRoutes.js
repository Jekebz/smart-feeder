const express = require("express");
const { getCamera } = require("../controllers/dashboardController");
const router = express.Router();

/**
 * @openapi
 * /camera/live:
 *   get:
 *     tags: [Camera]
 *     summary: Get live camera placeholder stream
 *     responses:
 *       200: { description: Camera stream URL }
 */
router.get("/live", getCamera);

module.exports = router;
