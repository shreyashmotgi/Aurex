const { updatePrices } = require("./market/priceUpdater");
const { updateTrends } = require("./market/trendUpdater");
const { flushCandles } = require("./CandleService");

const startMarketEngine = () => {

  setInterval(updatePrices, 5000);

  setInterval(updateTrends, 30000);

  setInterval(flushCandles, 60000);

};

module.exports = { startMarketEngine };