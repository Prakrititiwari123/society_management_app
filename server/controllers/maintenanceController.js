import MaintenanceRequest from "../models/MaintenanceRequest.js";

export const getMaintenanceRequests = async (req, res, next) => {
  try {
    const filters = {};

    if (req.user?._id) {
      filters.user = req.user._id;
    }

    const requests = await MaintenanceRequest.find(filters)
      .sort({ createdAt: -1 })
      .populate("user", "firstName lastName username roomNo email phone");

    res.json(requests);
  } catch (error) {
    next(error);
  }
};

export const createMaintenanceRequest = async (req, res, next) => {
  try {
    const { title, category, priority, description } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error("Please provide title and description");
    }

    const request = await MaintenanceRequest.create({
      user: req.user?._id,
      title,
      category: category || "Other",
      priority: priority || "Medium",
      description,
    });

    const populatedRequest = await request.populate("user", "firstName lastName username roomNo email phone");

    res.status(201).json(populatedRequest);
  } catch (error) {
    next(error);
  }
};