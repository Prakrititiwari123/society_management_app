import express from "express";
import {
  createDiscussion,
  createEvent,
  getDiscussions,
  getEvents,
  getHighlights,
} from "../controllers/communityController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/highlights", getHighlights);
router.get("/events", getEvents);
router.post("/events", protect, createEvent);
router.get("/discussions", getDiscussions);
router.post("/discussions", createDiscussion);

export default router;
