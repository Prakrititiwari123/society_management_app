import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    issueType: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);
export default ContactMessage;
