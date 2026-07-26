const { UserModel } = require("../models/Usermodel");
const { Fundsmodel } = require("../models/Fundsmodel");
const { Holdingsmodel } = require("../models/Holdingsmodel");
const { WatchlistModel } = require("../models/WatchlistModel");

const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    // ---------------- User ----------------

    const user = await UserModel.findById(userId).select(
      "fullName username"
    );

    // ---------------- Funds ----------------

    const funds = await Fundsmodel.findOne({ userId });

    if (!funds) {
      return res.status(404).json({
        success: false,
        message: "Funds not found",
      });
    }

    // ---------------- Holdings ----------------

    const holdings = await Holdingsmodel.find({ userId });

    // Get all stock ids

    const stockIds = holdings.map(
      (holding) => holding.stockId
    );

    // Fetch all stocks in ONE query

    const stocks = await WatchlistModel.find({
      _id: { $in: stockIds },
    });

    // Create Map

    const stockMap = new Map();

    stocks.forEach((stock) => {
      stockMap.set(stock._id.toString(), stock);
    });

    let investment = 0;
    let currentValue = 0;

    holdings.forEach((holding) => {
      const stock = stockMap.get(
        holding.stockId.toString()
      );

      if (!stock) return;

      investment +=
        holding.averagePrice * holding.quantity;

      currentValue +=
        stock.price * holding.quantity;
    });

    const totalPnL = currentValue - investment;

    const pnlPercent =
      investment === 0
        ? 0
        : (totalPnL / investment) * 100;

    res.status(200).json({
      success: true,

      summary: {
        fullName: user.fullName,

        availableMargin:
          funds.availableMargin,

        usedMargin:
          funds.usedMargin,

        openingBalance:
          funds.openingBalance,

        holdingsCount:
          holdings.length,

        investment,

        currentValue,

        totalPnL,

        pnlPercent,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getSummary,
};