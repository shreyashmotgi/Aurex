const { getUserHoldings } = require("./holdingsService");
const { analyzePortfolio } = require("../utils/analyzePortfolio");
const { WatchlistModel } = require("../models/WatchlistModel");

const { analyzeStockHistory } = require("../utils/analyzeStockHistory");
const { StockHistorymodel } = require("../models/StockHistorymodel");

const getPortfolioSummary = async (userId) => {
  const holdings = await getUserHoldings(userId);

  if (!holdings || holdings.length === 0) {
    return {
      success: false,
      message: "No holdings found",
    };
  }

  return analyzePortfolio(holdings);
};

const getStockPrice = async (stockSymbol) => {
  if (!stockSymbol) {
    return {
      success: false,
      message: "Stock symbol is required",
    };
  }
  const stock = await WatchlistModel.findOne({
    name: stockSymbol.toUpperCase(),
  });

  if (!stock) {
    return {
      success: false,
      message: "Stock not found",
    };
  }

  return {
    success: true,
    stockName: stock.name,
    price: stock.price,
    previousPrice: stock.previousPrice,
  };
};

const timeframeToMs = {
  "30m": 30 * 60 * 1000,
  "1h": 60 * 60 * 1000,
  "3h": 3 * 60 * 60 * 1000,
  "1d": 24 * 60 * 60 * 1000,
  "2d": 2 * 24 * 60 * 60 * 1000,
  "3d": 3 * 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
};

// "today" is defined as since midnight (server time), not just "last 24h"
function getStartDate(timeframe) {
  if (timeframe === "today") {
    const now = new Date();
    // convert to IST (UTC+5:30) explicitly, regardless of server timezone
    const istOffsetMs = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + istOffsetMs);
    istNow.setUTCHours(0, 0, 0, 0);
    return new Date(istNow.getTime() - istOffsetMs); // back to a real UTC instant representing IST midnight
  }
}

const getStockAnalysis = async (stockSymbol, timeframe = "today") => {
  if (!stockSymbol) {
    return { success: false, message: "Stock symbol is required" };
  }

  const stock = await WatchlistModel.findOne({
    name: stockSymbol.toUpperCase(),
  });

  if (!stock) {
    return { success: false, message: "Stock not found" };
  }

  const startDate = getStartDate(timeframe);

  const history = await StockHistorymodel.find({
    stockId: stock._id,
    candleTime: { $gte: startDate },
  }).sort({ candleTime: 1 });

  if (!history || history.length === 0) {
    return { success: false, message: `No data available for the selected timeframe (${timeframe})` };
  }

  const analysis = analyzeStockHistory(history);

  return {
    success: true,
    stockName: stock.name,
    timeframe, // echo back what window this analysis actually covers -- important for the AI to state clearly
    currentPrice: analysis.currentPrice,
    startingPrice: analysis.startingPrice,
    trend: analysis.trend,
    volatility: analysis.volatility,
    priceChangePercent: analysis.priceChangePercent,
    candlesAnalyzed: analysis.candlesAnalyzed,
  };
};

module.exports = {
  getPortfolioSummary,
  getStockPrice,
  getStockAnalysis,
};
