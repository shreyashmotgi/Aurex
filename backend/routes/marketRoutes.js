const express = require("express");

const {
  seedMarket,
  getAllStocks,
  getStockByName,
  getStockById,
} = require("../controllers/marketController");

const router = express.Router();

router.post("/seed", seedMarket);

router.get("/", getAllStocks);

router.get("/:name", getStockByName);

router.get("/id/:stockId", getStockById);

module.exports = router;