const { WatchlistModel } = require("../../models/WatchlistModel");
const { updateCandle } = require("../CandleService");

const updatePrices = async () => {
  try {
    const stocks = await WatchlistModel.find();

    const updates = stocks.map((stock) => {
      const previousPrice = stock.price;

      let direction;

      // Decide movement direction
      if (stock.trend === 1) {
        // Bullish -> 70% Up, 30% Down
        direction = Math.random() < 0.7 ? 1 : -1;

      } else if (stock.trend === -1) {
        // Bearish -> 70% Down, 30% Up
        direction = Math.random() < 0.7 ? -1 : 1;

      } else {
        // Sideways -> 50% Up, 50% Down
        direction = Math.random() < 0.5 ? 1 : -1;
      }

      const randomMove =
        Math.random() * stock.volatility;

      const changePercent =
        randomMove * direction;

      const newPrice = Number(
        Math.max(
          previousPrice * (1 + changePercent),
          1
        ).toFixed(2)
      );

      // ---------------- Update Candle ----------------
      updateCandle(stock._id, newPrice);

      return {
        updateOne: {
          filter: {
            _id: stock._id,
          },
          update: {
            $set: {
              previousPrice,
              price: newPrice,
            },
          },
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