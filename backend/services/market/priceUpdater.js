const { WatchlistModel } = require("../../models/WatchlistModel");
const { updateCandle } = require("../CandleService");

const SOFT_BAND_MIN = 0.6;   // 60% of base -- freely roams inside this, no correction at all
const SOFT_BAND_MAX = 1.6;   // 160% of base
const REVERSION_STRENGTH = 0.08; // only applies once price strays outside the soft band
const HARD_MIN = 0.4;        // absolute wall -- never crossed, no matter what
const HARD_MAX = 2.5;

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

      // ---- Reversion ONLY kicks in outside the soft band ----
      // Inside the band: zero correction, trend/volatility move completely freely.
      // This is what lets a bullish/bearish stock actually build a visible trend
      // instead of being fought back to sideways on every single tick.
      const softMin = stock.basePrice * SOFT_BAND_MIN;
      const softMax = stock.basePrice * SOFT_BAND_MAX;

      let reversionAmount = 0;
      if (previousPrice > softMax) {
        reversionAmount = -(previousPrice - softMax) * REVERSION_STRENGTH;
      } else if (previousPrice < softMin) {
        reversionAmount = (softMin - previousPrice) * REVERSION_STRENGTH;
      }

      let newPrice = previousPrice + changeAmount + reversionAmount;

      // absolute safety net -- price can never leave this band, no matter what
      const minAllowed = stock.basePrice * HARD_MIN;
      const maxAllowed = stock.basePrice * HARD_MAX;
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