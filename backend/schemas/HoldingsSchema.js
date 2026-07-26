const mongoose = require("mongoose");

const HoldingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Watchlist",
      required: true,
    },

    stockName: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    averagePrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

HoldingsSchema.index(
  {
    userId: 1,
    stockId: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Holdings", HoldingsSchema);