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

    basePrice: {
      type: Number,
      required: true,
      min: 1,
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
      max: 0.015,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = { WatchlistSchema };