const express = require("express");

const {
  placeOrder,
  getOrders,
} = require("../controllers/orderController");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", verifyToken, placeOrder);

router.get("/", verifyToken, getOrders);

module.exports = router;