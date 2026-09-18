const express = require("express");

const {
  getHoldings,
} = require("../controllers/holdingsController");

const verifyToken = require("../middlewares/verifyToken");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware,verifyToken, getHoldings);

module.exports = router;