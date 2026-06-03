const express = require("express");
const {
  createSchedule,
  deleteSchedule,
  getSchedules,
  updateSchedule,
} = require("../controllers/dashboardController");
const router = express.Router();

/**
 * @openapi
 * /schedules:
 *   get:
 *     tags: [Schedule]
 *     summary: List feeding schedules
 *     responses:
 *       200: { description: Schedule list }
 */
router.get("/", getSchedules);

/**
 * @openapi
 * /schedules:
 *   post:
 *     tags: [Schedule]
 *     summary: Create a feeding schedule
 *     responses:
 *       201: { description: Schedule created }
 */
router.post("/", createSchedule);

/**
 * @openapi
 * /schedules/{id}:
 *   put:
 *     tags: [Schedule]
 *     summary: Update a feeding schedule
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Schedule updated }
 */
router.put("/:id", updateSchedule);

/**
 * @openapi
 * /schedules/{id}:
 *   delete:
 *     tags: [Schedule]
 *     summary: Delete a feeding schedule
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Schedule deleted }
 */
router.delete("/:id", deleteSchedule);

module.exports = router;
