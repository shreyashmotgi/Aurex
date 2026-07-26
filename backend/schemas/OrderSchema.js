const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Watchlist",
      required: true,
    },
    product: {
      type: String,
      enum: ["CNC", "MIS"],
      default: "CNC",
    },
    stockName: {
      type: String,
      required: true,
      trim: true,
    },

    orderType: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["COMPLETED", "REJECTED"],
      default: "COMPLETED",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = { OrderSchema };
