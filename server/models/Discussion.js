import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    authorName: { type: String, required: true, trim: true },
    replies: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Discussion = mongoose.model("Discussion", discussionSchema);
export default Discussion;
