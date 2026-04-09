import mongoose from "mongoose";

const maintenanceRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ["Plumbing", "Electrical", "Cleaning", "Carpentry", "Lift", "Security", "Other"],
      default: "Other",
    },
    priority: { type: String, enum: ["Low", "Medium", "High", "Urgent"], default: "Medium" },
    description: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Open", "In Progress", "Resolved"], default: "Open" },
  },
  { timestamps: true }
);

const MaintenanceRequest = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
export default MaintenanceRequest;