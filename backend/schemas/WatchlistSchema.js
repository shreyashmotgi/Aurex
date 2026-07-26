const { Schema } = require("mongoose");

const WatchlistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    previousPrice: {
      type: Number,
      required: true,
      min: 1,
    },

    trend: {
      type: Number,
      enum: [-1, 0, 1],
      default: 0,
    },

    volatility: {
      type: Number,
      required: true,
      min: 0.005,
      max: 0.05,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = { WatchlistSchema };