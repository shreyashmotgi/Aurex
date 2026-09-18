const { aggregateCandles } = require("../utils/aggregateCandles");
const { analyzeStockHistory } = require("../utils/analyzeStockHistory");
const { StockHistorymodel } = require("../models/StockHistorymodel");
const { candleBuffer } = require("../services/CandleService");

const getStockHistory = async (req, res) => {
  try {
    const { stockId } = req.params;
    const interval = req.query.interval || "1m";

    const history = await StockHistorymodel.find({
      stockId,
    }).sort({
      candleTime: 1,
    });

    const analysis = analyzeStockHistory(history);

    let candles = aggregateCandles(history, interval);

    // Live candle only for 1 minute timeframe
    if (interval === "1m") {
      const live = candleBuffer[stockId];

      if (live) {
        const liveCandle = {
          time: Math.floor(live.candleTime.getTime() / 1000),
          open: live.open,
          high: live.high,
          low: live.low,
          close: live.close,
          volume: live.volume,
        };

        const last = candles[candles.length - 1];

        if (!last) {
          candles.push(liveCandle);
        } else if (last.time === liveCandle.time) {
          // Replace existing candle for same minute
          candles[candles.length - 1] = liveCandle;
        } else if (liveCandle.time > last.time) {
          // New minute -> append
          candles.push(liveCandle);
        }
      }
    }

    res.json({
      success: true,
      history: candles,
      analysis,
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
  getStockHistory,
};
