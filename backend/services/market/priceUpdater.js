const { WatchlistModel } = require("../../models/WatchlistModel");
const { updateCandle } = require("../CandleService");

const MEAN_REVERSION_STRENGTH = 0.05;

const updatePrices = async () => {
  try {
    const stocks = await WatchlistModel.find();

    const updates = stocks.map((stock) => {
      const previousPrice = stock.price;

      let direction;
      if (stock.trend === 1) {
        direction = Math.random() < 0.7 ? 1 : -1;
      } else if (stock.trend === -1) {
        direction = Math.random() < 0.7 ? -1 : 1;
      } else {
        direction = Math.random() < 0.5 ? 1 : -1;
      }

      const randomMove = Math.random() * stock.volatility;
      const changePercent = randomMove * direction;
      const changeAmount = previousPrice * changePercent;

      // pulls price back toward its anchor -- grows stronger the further it drifts
      const reversionAmount = (stock.basePrice - previousPrice) * MEAN_REVERSION_STRENGTH;

      let newPrice = previousPrice + changeAmount + reversionAmount;

      // absolute safety net -- price can never leave this band, no matter what
      const minAllowed = stock.basePrice * 0.4;
      const maxAllowed = stock.basePrice * 2.5;
      newPrice = Math.min(Math.max(newPrice, minAllowed), maxAllowed);
      newPrice = Math.max(newPrice, 1); // final failsafe
      newPrice = Number(newPrice.toFixed(2));

      updateCandle(stock._id, newPrice);

      return {
        updateOne: {
          filter: { _id: stock._id },
          update: { $set: { previousPrice, price: newPrice } },
        },
      };
    });

    await WatchlistModel.bulkWrite(updates);
    console.log("Prices Updated");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  updatePrices,
};