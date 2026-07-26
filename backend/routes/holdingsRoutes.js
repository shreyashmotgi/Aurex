const express = require("express");

const {
  getHoldings,
} = require("../controllers/holdingsController");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", verifyToken, getHoldings);

module.exports = router;