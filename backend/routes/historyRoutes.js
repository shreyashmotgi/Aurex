const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const verifyToken = require("../middlewares/verifyToken");
const {
  getStockHistory,
} = require("../controllers/historyController");

router.get(
  "/:stockId",
  authMiddleware,
  verifyToken,
  getStockHistory,
);

module.exports = router;