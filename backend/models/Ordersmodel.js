const mongoose = require("mongoose");
const { OrderSchema } = require("../schemas/OrderSchema");

const OrdersModel = mongoose.model(
  "Order",
  OrderSchema
);

module.exports = { OrdersModel };