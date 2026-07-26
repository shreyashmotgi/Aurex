const { WatchlistModel } = require("../../models/WatchlistModel");

const updateTrends = async () => {
  try {
    const stocks = await WatchlistModel.find();

    const updates = stocks.map((stock) => {
      let trend = stock.trend;

      const chance = Math.random();

      // -------- Trend --------

      if (stock.trend === 1) {

        if (chance < 0.70) {
          trend = 1;

        } else if (chance < 0.90) {
          trend = 0;

        } else {
          trend = -1;
        }

      } else if (stock.trend === -1) {

        if (chance < 0.70) {
          trend = -1;

        } else if (chance < 0.90) {
          trend = 0;

        } else {
          trend = 1;
        }

      } else {

        if (chance < 0.20) {
          trend = 0;

        } else if (chance < 0.60) {
          trend = 1;

        } else {
          trend = -1;
        }
      }

      // -------- Volatility --------

      const volatilityChange =
        Math.random() * 0.002 - 0.001;

      let volatility =
        stock.volatility + volatilityChange;

      volatility = Math.min(
        Math.max(volatility, 0.001),
        0.015
      );

      volatility = Number(
        volatility.toFixed(3)
      );

      return {
        updateOne: {
          filter: {
            _id: stock._id,
          },
          update: {
            $set: {
              trend,
              volatility,
            },
          },
        },
      };
    });

    await WatchlistModel.bulkWrite(updates);

    console.log("Trend Updated");

  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { updateTrends };