const { Holdingsmodel } = require("../models/Holdingsmodel");
const { WatchlistModel } = require("../models/WatchlistModel");

// ---------------- Get Holdings ----------------

const getHoldings = async (req, res) => {
  try {
    const holdings = await Holdingsmodel.find({
      userId: req.user.id,
    }).sort({
      stockName: 1,
    });

    // ---------------- Fetch all stocks in one query ----------------

    const stockIds = holdings.map(
      (holding) => holding.stockId
    );

    const stocks = await WatchlistModel.find({
      _id: { $in: stockIds },
    });

    // ---------------- Create Map ----------------

    const stockMap = new Map();

    stocks.forEach((stock) => {
      stockMap.set(stock._id.toString(), stock);
    });

    // ---------------- Build Response ----------------

    const result = holdings.map((holding) => {
      const stock = stockMap.get(
        holding.stockId.toString()
      );

      if (!stock) return null;

      const ltp = stock.price;

      const currentValue =
        holding.quantity * ltp;

      const investment =
        holding.quantity *
        holding.averagePrice;

      const pnl =
        currentValue - investment;

      const netChange =
        ((ltp - holding.averagePrice) /
          holding.averagePrice) *
        100;

      const dayChange =
        ((stock.price -
          stock.previousPrice) /
          stock.previousPrice) *
        100;

      return {
        _id: holding._id,

        stockId: holding.stockId,

        instrument: holding.stockName,

        quantity: holding.quantity,

        averagePrice: holding.averagePrice,

        ltp,

        currentValue,

        pnl,

        netChange,

        dayChange,
      };
    });

    res.status(200).json({
      success: true,
      holdings: result.filter(Boolean),
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
  getHoldings,
};