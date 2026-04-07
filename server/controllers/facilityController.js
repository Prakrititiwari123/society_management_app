import FacilityBooking from "../models/FacilityBooking.js";

const amenities = [
  "Clubhouse Hall",
  "Swimming Pool",
  "Tennis Court",
  "BBQ Deck",
  "Conference Room",
  "Guest Suite",
];

export const getAmenities = async (req, res) => {
  res.json(amenities);
};

export const getBookings = async (req, res, next) => {
  try {
    const filters = {};
    if (req.query.date) {
      filters.date = req.query.date;
    }

    const bookings = await FacilityBooking.find(filters).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req, res, next) => {
  try {
    const { facility, date, time } = req.body;

    if (!facility || !date || !time) {
      res.status(400);
      throw new Error("Please provide facility, date, and time");
    }

    if (!amenities.includes(facility)) {
      res.status(400);
      throw new Error("Invalid facility selected");
    }

    const duplicate = await FacilityBooking.findOne({ facility, date, time });
    if (duplicate) {
      res.status(409);
      throw new Error("This slot is already booked");
    }

    const booking = await FacilityBooking.create({
      user: req.user?._id,
      facility,
      date,
      time,
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};
