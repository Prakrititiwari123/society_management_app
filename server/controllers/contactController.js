import ContactMessage from "../models/ContactMessage.js";

export const submitContactMessage = async (req, res, next) => {
  try {
    const { issueType, name, email, priority, subject, message } = req.body;

    if (!issueType || !name || !email || !subject || !message) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    const contactMessage = await ContactMessage.create({
      issueType,
      name,
      email,
      priority: priority || "Medium",
      subject,
      message,
    });

    res.status(201).json({
      message: "Request submitted successfully",
      data: contactMessage,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};
