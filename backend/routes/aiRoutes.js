const express = require("express");

const router = express.Router();

const {
  getAIStockAnalysis,
  getAIPortfolioAnalysis,
  getAIAssistant,
} = require("../controllers/aiController");
const verifyToken = require("../middlewares/verifyToken");

router.get("/stock-analysis/:stockId", verifyToken, getAIStockAnalysis);

router.get("/portfolio-analysis", verifyToken, getAIPortfolioAnalysis);

router.post("/assistant", verifyToken, getAIAssistant);

module.exports = router;
