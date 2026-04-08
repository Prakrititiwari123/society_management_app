import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "7d" });

const normalizeEmail = (value) => value?.trim().toLowerCase();

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const isHashedPassword = (value) => typeof value === "string" && value.startsWith("$2");

const findUserByEmail = async (email) => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  const exactUser = await User.findOne({ email: normalizedEmail });

  if (exactUser) {
    return exactUser;
  }

  const emailPattern = new RegExp(`^\\s*${escapeRegExp(normalizedEmail)}\\s*$`, "i");
  return User.findOne({ email: emailPattern });
};

export const registerUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
      dateOfBirth,
      gender,
    } = req.body;

    const normalizedEmail = normalizeEmail(email);
    const normalizedUsername = username?.trim();

    if (!firstName || !lastName || !normalizedUsername || !normalizedEmail || !password) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
    });

    if (existingUser) {
      res.status(409);
      throw new Error("User already exists with email or username");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      username: normalizedUsername,
      email: normalizedEmail,
      phone: phone?.trim(),
      password: hashedPassword,
      dateOfBirth,
      gender,
    });

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const isMatch = isHashedPassword(user.password)
      ? await bcrypt.compare(password, user.password)
      : password === user.password;

    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    if (!isHashedPassword(user.password)) {
      user.password = await bcrypt.hash(password, 10);
      await user.save();
    }

    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  res.json(req.user);
};
