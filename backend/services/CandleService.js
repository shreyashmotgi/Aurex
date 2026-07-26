const { StockHistorymodel } = require("../models/StockHistorymodel");

const candleBuffer = {};

// ---------------- Update Candle ----------------

const updateCandle = (stockId, currentPrice) => {
  const id = stockId.toString();

  // Create first candle
  if (!candleBuffer[id]) {
    const now = new Date();

    now.setSeconds(0);
    now.setMilliseconds(0);

    candleBuffer[id] = {
      stockId,

      candleTime: now,

      open: currentPrice,
      high: currentPrice,
      low: currentPrice,
      close: currentPrice,

      volume: Math.floor(Math.random() * 100) + 50,
    };

    return;
  }

  const candle = candleBuffer[id];

  if (currentPrice > candle.high) {
    candle.high = currentPrice;
  }

  if (currentPrice < candle.low) {
    candle.low = currentPrice;
  }

  candle.close = currentPrice;

  candle.volume += Math.floor(Math.random() * 20);
};

// ---------------- Save Candles ----------------

const flushCandles = async () => {
  try {
    const candles = Object.values(candleBuffer);

    if (!candles.length) return;

    const documents = candles.map((candle) => ({
      stockId: candle.stockId,

      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,

      volume: candle.volume,

      // VERY IMPORTANT
      // Save the candle's own timestamp,
      // NOT new Date()
      candleTime: candle.candleTime,
    }));

    await StockHistorymodel.insertMany(documents);

    console.log(`Saved ${documents.length} candles`);

    // -----------------------
    // Start next candle
    // -----------------------

    Object.keys(candleBuffer).forEach((key) => {
      const previous = candleBuffer[key];

      const nextMinute = new Date(previous.candleTime);

      // Move to next minute
      nextMinute.setMinutes(nextMinute.getMinutes() + 1);

      candleBuffer[key] = {
        stockId: previous.stockId,

        candleTime: nextMinute,

        open: previous.close,
        high: previous.close,
        low: previous.close,
        close: previous.close,

        volume: 0,
      };
    });

  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  updateCandle,
  flushCandles,
  candleBuffer,
};