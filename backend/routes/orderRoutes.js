const express = require("express");

const {
  placeOrder,
  getOrders,
} = require("../controllers/orderController");

const verifyToken = require("../middlewares/verifyToken");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware,verifyToken, placeOrder);

router.get("/", authMiddleware,verifyToken, getOrders);

module.exports = router;