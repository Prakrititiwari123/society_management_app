import express from "express";
import { getPaymentSummary, getTransactions, payDue } from "../controllers/paymentController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/summary", protect, getPaymentSummary);
router.get("/transactions", protect, getTransactions);
router.post("/pay", protect, payDue);

export default router;
