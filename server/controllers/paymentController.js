import Payment from "../models/Payment.js";

export const getTransactions = async (req, res, next) => {
  try {
    const filters = {};
    if (req.user?._id) {
      filters.user = req.user._id;
    }

    const transactions = await Payment.find(filters).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

export const getPaymentSummary = async (req, res, next) => {
  try {
    const filters = {};
    if (req.user?._id) {
      filters.user = req.user._id;
    }

    const transactions = await Payment.find(filters);

    const totalDue = transactions
      .filter((tx) => tx.status === "Pending")
      .reduce((sum, tx) => sum + tx.amount, 0);

    const paidThisMonth = transactions
      .filter((tx) => tx.status === "Paid")
      .reduce((sum, tx) => sum + tx.amount, 0);

    res.json({
      totalDue,
      paidThisMonth,
      walletBalance: 0,
      transactionsCount: transactions.length,
    });
  } catch (error) {
    next(error);
  }
};

export const payDue = async (req, res, next) => {
  try {
    const { title, amount, method } = req.body;

    if (!title || !amount) {
      res.status(400);
      throw new Error("Please provide title and amount");
    }

    const transaction = await Payment.create({
      user: req.user?._id,
      title,
      amount,
      status: "Paid",
      method: method || "UPI",
      paidAt: new Date(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};
