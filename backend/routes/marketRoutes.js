const express = require("express");

const {
  seedMarket,
  getAllStocks,
  getStockByName,
  getStockById,
} = require("../controllers/marketController");

const verifyToken = require("../middlewares/verifyToken");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/seed", seedMarket);

router.get("/", authMiddleware,verifyToken,getAllStocks);

router.get("/:name",authMiddleware,verifyToken, getStockByName);

router.get("/id/:stockId",authMiddleware,verifyToken, getStockById);

module.exports = router;