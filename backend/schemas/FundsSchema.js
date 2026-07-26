const mongoose = require("mongoose");

const FundsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    openingBalance: {
      type: Number,
      default: 100000,
      min: 0,
    },

    availableBalance: {
      type: Number,
      default: 100000,
      min: 0,
    },

    usedMargin: {
      type: Number,
      default: 0,
      min: 0,
    },

    availableMargin: {
      type: Number,
      default: 100000,
      min: 0,
    },

    payin: {
      type: Number,
      default: 0,
      min: 0,
    },

    payout: {
      type: Number,
      default: 0,
      min: 0,
    },

    span: {
      type: Number,
      default: 0,
    },

    exposure: {
      type: Number,
      default: 0,
    },

    deliveryMargin: {
      type: Number,
      default: 0,
    },

    optionPremium: {
      type: Number,
      default: 0,
    },

    collateralLiquid: {
      type: Number,
      default: 0,
    },

    collateralEquity: {
      type: Number,
      default: 0,
    },

    totalCollateral: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Funds", FundsSchema);