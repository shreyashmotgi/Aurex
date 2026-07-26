const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  getStockHistory,
} = require("../controllers/historyController");

router.get(
  "/:stockId",
  authMiddleware,
  getStockHistory,
);

module.exports = router;