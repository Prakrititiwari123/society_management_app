import mongoose from "mongoose";

const facilityBookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    facility: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

const FacilityBooking = mongoose.model("FacilityBooking", facilityBookingSchema);
export default FacilityBooking;
