import express from "express";
import { getContactMessages, submitContactMessage } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", submitContactMessage);
router.get("/", getContactMessages);

export default router;