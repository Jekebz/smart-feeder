const express = require("express");
const protect = require("../middleware/auth");
const { login, profile, register } = require("../controllers/authController");

const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a feeder owner
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string, example: Ria }
 *               email: { type: string, example: ria@example.com }
 *               password: { type: string, example: password123 }
 *     responses:
 *       201: { description: JWT issued }
 */
router.post("/register", register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login and receive a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: ria@example.com }
 *               password: { type: string, example: password123 }
 *     responses:
 *       200: { description: JWT issued }
 */
router.post("/login", login);

/**
 * @openapi
 * /auth/profile:
 *   get:
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     summary: Get the authenticated owner profile
 *     responses:
 *       200: { description: Profile }
 */
router.get("/profile", protect, profile);

module.exports = router;
