import mongoose from "mongoose";

const communityEventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const CommunityEvent = mongoose.model("CommunityEvent", communityEventSchema);
export default CommunityEvent;
