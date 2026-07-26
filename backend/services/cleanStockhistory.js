const { StockHistorymodel } = require("../models/StockHistorymodel");

const cleanStockHistory = async () => {
  try {
    // 30 days ago
    const thirtyDaysAgo = new Date();

    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await StockHistorymodel.deleteMany({
      candleTime: {
        $lt: thirtyDaysAgo,
      },
    });

    console.log(
      `Deleted ${result.deletedCount} old candles`
    );
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = cleanStockHistory;