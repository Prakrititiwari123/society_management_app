import FacilityBooking from "../models/FacilityBooking.js";
import MaintenanceRequest from "../models/MaintenanceRequest.js";
import Payment from "../models/Payment.js";
import User from "../models/User.js";

const paymentMethods = ["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallet", "Cash", "Cheque"];

export const getDashboardOverview = async (req, res, next) => {
  try {
    const userId = req.user?._id;

    const [profile, payments, maintenanceRequests, bookings] = await Promise.all([
      User.findById(userId).select("-password"),
      Payment.find({ user: userId }).sort({ createdAt: -1 }),
      MaintenanceRequest.find({ user: userId }).sort({ createdAt: -1 }),
      FacilityBooking.find({ user: userId }).sort({ createdAt: -1 }),
    ]);

    const totalDue = payments
      .filter((transaction) => transaction.status === "Pending")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const paidThisMonth = payments
      .filter((transaction) => transaction.status === "Paid")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const openMaintenance = maintenanceRequests.filter((request) => request.status !== "Resolved").length;

    const facilityBookings = bookings.map((booking) => ({
      _id: booking._id,
      name: booking.facility,
      category: "Used",
      type: "booking",
      status: booking.status,
      amount: null,
      date: booking.date,
      time: booking.time,
      note: `Booked for ${booking.date} at ${booking.time}`,
    }));

    res.json({
      profile,
      paymentSummary: {
        totalDue,
        paidThisMonth,
        walletBalance: 0,
        transactionsCount: payments.length,
      },
      recentPayments: payments.slice(0, 5),
      maintenanceRequests: maintenanceRequests.slice(0, 5),
      maintenanceStats: {
        open: openMaintenance,
        total: maintenanceRequests.length,
      },
      userFacilities: facilityBookings.length > 0 ? [facilityBookings[0]] : [],
      paymentMethods,
    });
  } catch (error) {
    next(error);
  }
};