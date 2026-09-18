const analyzeStockHistory = (history) => {
  if (!history || history.length === 0) return null;

  const latest = history[history.length - 1];
  const first = history[0];

  const closes = history.map((c) => c.close);
  const volumes = history.map((c) => c.volume || 0);

  const currentPrice = latest.close;
  const startingPrice = first.close;

  const averagePrice = closes.reduce((s, p) => s + p, 0) / closes.length;
  const highestPrice = Math.max(...closes);
  const lowestPrice = Math.min(...closes);

  const priceChange = currentPrice - startingPrice;
  const priceChangePercent = (priceChange / startingPrice) * 100;

  const averageVolume = volumes.reduce((s, v) => s + v, 0) / volumes.length;

  // ---------------- Trend: split the ACTUAL window in half, proportionally.
  // Scales to however many candles exist in the requested timeframe,
  // instead of a fixed 20/40-candle rule that breaks on short windows.
  let trend = "sideways";
  if (history.length >= 4) {
    const mid = Math.floor(history.length / 2);
    const firstHalf = history.slice(0, mid);
    const secondHalf = history.slice(mid);

    const firstAvg = firstHalf.reduce((s, c) => s + c.close, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((s, c) => s + c.close, 0) / secondHalf.length;

    const trendChangePercent = ((secondAvg - firstAvg) / firstAvg) * 100;

    if (trendChangePercent > 1) trend = "bullish";
    else if (trendChangePercent < -1) trend = "bearish";
  }

  // ---------------- Recent momentum: last quarter of the window vs the
  // quarter before it. This is what lets the AI say "up overall, but
  // recently declining" -- ChatGPT's example -- instead of one contradictory label.
  let recentMomentum = "steady";
  if (history.length >= 8) {
    const quarter = Math.max(2, Math.floor(history.length / 4));
    const recent = history.slice(-quarter);
    const priorToRecent = history.slice(-quarter * 2, -quarter);

    const recentAvg = recent.reduce((s, c) => s + c.close, 0) / recent.length;
    const priorAvg = priorToRecent.reduce((s, c) => s + c.close, 0) / priorToRecent.length;

    const momentumChangePercent = ((recentAvg - priorAvg) / priorAvg) * 100;

    if (momentumChangePercent > 1) recentMomentum = "rising";
    else if (momentumChangePercent < -1) recentMomentum = "falling";
  }

  // ---------------- Volatility: over the WHOLE requested window, not a
  // fixed last-20-candles slice -- so short timeframes still get a real reading.
  const rangePercentages = history.map((c) => ((c.high - c.low) / c.close) * 100);
  const averageRangePercent = rangePercentages.reduce((s, v) => s + v, 0) / rangePercentages.length;

  let volatility = "low";
  if (averageRangePercent >= 1) volatility = "high";
  else if (averageRangePercent >= 0.5) volatility = "medium";

  let sma20 = null, sma50 = null;
  if (history.length >= 20) {
    sma20 = history.slice(-20).reduce((s, c) => s + c.close, 0) / 20;
  }
  if (history.length >= 50) {
    sma50 = history.slice(-50).reduce((s, c) => s + c.close, 0) / 50;
  }

  let smaSignal = "neutral";
  if (sma20 !== null && sma50 !== null) {
    smaSignal = sma20 > sma50 ? "bullish" : sma20 < sma50 ? "bearish" : "neutral";
  }

  return {
    currentPrice: Number(currentPrice.toFixed(2)),
    startingPrice: Number(startingPrice.toFixed(2)),
    averagePrice: Number(averagePrice.toFixed(2)),
    highestPrice: Number(highestPrice.toFixed(2)),
    lowestPrice: Number(lowestPrice.toFixed(2)),
    priceChange: Number(priceChange.toFixed(2)),
    priceChangePercent: Number(priceChangePercent.toFixed(2)),
    averageVolume: Number(averageVolume.toFixed(2)),
    trend, // overall direction across the full requested window
    recentMomentum, // short-term direction within that window -- may legitimately differ from `trend`
    averageRangePercent: Number(averageRangePercent.toFixed(2)),
    volatility,
    sma20: sma20 !== null ? Number(sma20.toFixed(2)) : null,
    sma50: sma50 !== null ? Number(sma50.toFixed(2)) : null,
    smaSignal,
    candlesAnalyzed: history.length,
    startTime: first.candleTime,
    endTime: latest.candleTime,
  };
};

module.exports={
  analyzeStockHistory,
};