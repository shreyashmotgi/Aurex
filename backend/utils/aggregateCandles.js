const intervalMap = {
  "1m": 1,
  "5m": 5,
  "10m": 10,
  "15m": 15,
  "30m": 30,
  "1h": 60,
  "3h": 180,
  "6h": 360,
  "1d": 1440,
};

const aggregateCandles = (candles, interval = "1m") => {
  const size = intervalMap[interval] || 1;

  if (size === 1) {
    return candles.map((candle) => ({
      time: Math.floor(new Date(candle.candleTime).getTime() / 1000),
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
      volume: candle.volume,
    }));
  }

  const result = [];

  for (let i = 0; i < candles.length; i += size) {
    const group = candles.slice(i, i + size);

    if (group.length === 0) continue;

    result.push({
      time: Math.floor(
        new Date(group[0].candleTime).getTime() / 1000
      ),

      open: group[0].open,

      high: Math.max(...group.map((c) => c.high)),

      low: Math.min(...group.map((c) => c.low)),

      close: group[group.length - 1].close,

      volume: group.reduce((sum, c) => sum + c.volume, 0),
    });
  }

  return result;
};

module.exports = {
  aggregateCandles,
};