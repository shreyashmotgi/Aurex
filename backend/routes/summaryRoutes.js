const express = require("express");

const {
  getSummary,
} = require("../controllers/summaryController");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", verifyToken, getSummary);

module.exports = router;