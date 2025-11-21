import express from "express";
import { createCheckoutSession } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route for creating a checkout session
router.post("/create-checkout-session", protect, createCheckoutSession);

export default router;