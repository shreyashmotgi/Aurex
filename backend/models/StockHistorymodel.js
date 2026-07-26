const mongoose = require("mongoose");
const { StockHistorySchema } = require("../schemas/StockHistorySchema");

const StockHistorymodel = mongoose.model(
  "StockHistory",
  StockHistorySchema
);

module.exports = { StockHistorymodel };