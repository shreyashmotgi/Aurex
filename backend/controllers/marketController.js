const { WatchlistModel } = require("../models/WatchlistModel");

// ---------------- Seed Initial Market ----------------

const seedMarket = async (req, res) => {
  try {
    await WatchlistModel.deleteMany({});

    const stocks = await WatchlistModel.insertMany(req.body);

    res.status(201).json({
      success: true,
      message: "Market seeded successfully",
      count: stocks.length,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getStockById = async (req, res) => {
  try {
    const stock = await WatchlistModel.findById(req.params.stockId);

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    res.json({
      success: true,
      stock,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ---------------- Get All Stocks ----------------

const getAllStocks = async (req, res) => {
  try {

    const stocks = await WatchlistModel.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      stocks,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ---------------- Get Single Stock ----------------

const getStockByName = async (req, res) => {
  try {

    const stock = await WatchlistModel.findOne({
      name: req.params.name.toUpperCase(),
    });

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    res.status(200).json({
      success: true,
      stock,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  seedMarket,
  getAllStocks,
  getStockByName,
  getStockById,
};