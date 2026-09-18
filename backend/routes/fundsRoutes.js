const express = require("express");

const { getFunds } = require("../controllers/fundsController");
const verifyToken = require("../middlewares/verifyToken");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware,verifyToken, getFunds);

module.exports = router;