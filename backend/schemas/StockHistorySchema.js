const mongoose = require("mongoose");

const StockHistorySchema = new mongoose.Schema(
  {
    stockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Watchlist",
      required: true,
    },

    open: {
      type: Number,
      required: true,
    },

    high: {
      type: Number,
      required: true,
    },

    low: {
      type: Number,
      required: true,
    },

    close: {
      type: Number,
      required: true,
    },

    volume: {
      type: Number,
      default: 0,
    },

    candleTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

// One candle per stock per minute
StockHistorySchema.index(
  { stockId: 1, candleTime: 1 },
  { unique: true }
);

module.exports = { StockHistorySchema };