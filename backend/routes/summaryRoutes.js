const express = require("express");

const {
  getSummary,
} = require("../controllers/summaryController");

const verifyToken = require("../middlewares/verifyToken");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware,verifyToken, getSummary);

module.exports = router;