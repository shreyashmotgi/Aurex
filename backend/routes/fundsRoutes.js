const express = require("express");

const { getFunds } = require("../controllers/fundsController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", verifyToken, getFunds);

module.exports = router;