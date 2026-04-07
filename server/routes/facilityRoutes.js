import express from "express";
import { createBooking, getAmenities, getBookings } from "../controllers/facilityController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/amenities", getAmenities);
router.get("/bookings", getBookings);
router.post("/bookings", protect, createBooking);

export default router;
