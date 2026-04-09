import express from "express";
import { createMaintenanceRequest, getMaintenanceRequests } from "../controllers/maintenanceController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getMaintenanceRequests);
router.post("/", protect, createMaintenanceRequest);

export default router;