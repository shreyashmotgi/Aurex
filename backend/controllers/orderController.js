const mongoose = require("mongoose");

const { OrdersModel } = require("../models/Ordersmodel");
const { WatchlistModel } = require("../models/WatchlistModel");
const { Holdingsmodel } = require("../models/Holdingsmodel");
const { Fundsmodel } = require("../models/Fundsmodel");


// ---------------- Place Order ----------------

const placeOrder = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const userId = req.user.id;

    const {
    stockId,
    orderType,
    quantity,
    product = "CNC",
    } = req.body;

    const qty = Number(quantity);

    // ---------------- Validation ----------------

    if (!stockId || !orderType || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // ---------------- Find Stock ----------------

    const stock = await WatchlistModel.findById(stockId);

    if (!stock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found",
      });
    }

    const price = stock.price;

    const totalAmount = price * quantity;

    // ---------------- Funds ----------------

    const funds = await Fundsmodel.findOne({
      userId,
    }).session(session);

   if (!funds) {
    await session.abortTransaction();
    return res.status(404).json({
        success: false,
        message: "Funds account not found",
    });
}

    // ===================================================
    // BUY
    // ===================================================

    if (orderType === "BUY") {

      if (funds.availableBalance < totalAmount) {
        return res.status(400).json({
          success: false,
          message: "Insufficient Balance",
        });
      }

      funds.availableBalance -= totalAmount;
      funds.availableMargin = funds.availableBalance;
      funds.usedMargin += totalAmount;

      await funds.save({ session });

      const holding = await Holdingsmodel.findOne({
        userId,
        stockId,
      }).session(session);

      if (!holding) {

        await Holdingsmodel.create(
          [
            {
              userId,
              stockId,
              stockName: stock.name,
              quantity,
              averagePrice: price,
            },
          ],
          { session }
        );

      } else {

        const totalQty = holding.quantity + quantity;

        const avgPrice =
          (
            holding.averagePrice * holding.quantity +
            price * quantity
          ) / totalQty;

        holding.quantity = totalQty;
        holding.averagePrice = avgPrice;

        await holding.save({ session });
      }
    }

    // ===================================================
    // SELL
    // ===================================================

    else {

      const holding = await Holdingsmodel.findOne({
        userId,
        stockId,
      }).session(session);

      if (!holding || holding.quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: "Not enough shares",
        });
      }

      holding.quantity -= quantity;

      if (holding.quantity === 0) {
        await Holdingsmodel.deleteOne(
          {
            _id: holding._id,
          },
          { session }
        );
      } else {
        await holding.save({ session });
      }

      funds.availableBalance += totalAmount;
      funds.availableMargin = funds.availableBalance;
      funds.usedMargin -= holding.averagePrice * quantity;

    // Prevent negative values
    if (funds.usedMargin < 0) {
    funds.usedMargin = 0;
    }

      await funds.save({ session });
    }

    // ---------------- Save Order ----------------

    await OrdersModel.create(
      [
        {
          userId,
          stockId,
          stockName: stock.name,
          product,
          orderType,
          quantity,
          price,
          totalAmount,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    session.endSession();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });

  } catch (err) {

    await session.abortTransaction();

    session.endSession();

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


// ---------------- Get Orders ----------------

const getOrders = async (req, res) => {
  try {

    const orders = await OrdersModel.find({
      userId: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

module.exports = {
  placeOrder,
  getOrders,
};