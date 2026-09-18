const {Holdingsmodel} = require("../models/Holdingsmodel");
const { WatchlistModel } = require("../models/WatchlistModel");

const getUserHoldings = async (userId) => {
  const holdings = await Holdingsmodel.find({
    userId,
  }).sort({
    stockName: 1,
  });

  const stockIds = holdings.map(
    (holding) => holding.stockId
  );

  const stocks = await WatchlistModel.find({
    _id: { $in: stockIds },
  });

  const stockMap = new Map();

  stocks.forEach((stock) => {
    stockMap.set(
      stock._id.toString(),
      stock
    );
  });

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

    const netChangePercent =
      ((ltp - holding.averagePrice) /
        holding.averagePrice) *
      100;

    const dayChange =
      ((stock.price - stock.previousPrice) /
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
      netChangePercent,
      dayChange,
    };
  });

  return result.filter(Boolean);
};

module.exports = {
  getUserHoldings,
};