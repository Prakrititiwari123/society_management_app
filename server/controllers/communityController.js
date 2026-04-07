import CommunityEvent from "../models/CommunityEvent.js";
import Discussion from "../models/Discussion.js";
import User from "../models/User.js";

export const getHighlights = async (req, res, next) => {
  try {
    const [residents, discussions, events] = await Promise.all([
      User.countDocuments(),
      Discussion.countDocuments(),
      CommunityEvent.countDocuments(),
    ]);

    res.json({
      residentsActive: residents,
      openDiscussions: discussions,
      upcomingEvents: events,
      volunteerGroups: 9,
    });
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const events = await CommunityEvent.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const { name, date, time, venue } = req.body;

    if (!name || !date || !time || !venue) {
      res.status(400);
      throw new Error("Please provide name, date, time, and venue");
    }

    const event = await CommunityEvent.create({
      name,
      date,
      time,
      venue,
      createdBy: req.user?._id,
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const getDiscussions = async (req, res, next) => {
  try {
    const discussions = await Discussion.find().sort({ createdAt: -1 });
    res.json(discussions);
  } catch (error) {
    next(error);
  }
};

export const createDiscussion = async (req, res, next) => {
  try {
    const { topic, category, authorName } = req.body;

    if (!topic || !category || !authorName) {
      res.status(400);
      throw new Error("Please provide topic, category, and authorName");
    }

    const discussion = await Discussion.create({
      topic,
      category,
      authorName,
      replies: 0,
    });

    res.status(201).json(discussion);
  } catch (error) {
    next(error);
  }
};
