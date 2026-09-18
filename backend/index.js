require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { startMarketEngine } = require("./services/marketEngine");
const cleanupUnverifiedUsers = require("./services/cleanUnverifiedUsers");
const cleanStockHistory = require("./services/cleanStockhistory");

const authRoutes = require("./routes/authRoutes");
const marketRoutes = require("./routes/marketRoutes");
const fundsRoutes = require("./routes/fundsRoutes");
const orderRoutes = require("./routes/orderRoutes");
const holdingsRoutes = require("./routes/holdingsRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const historyRoutes = require("./routes/historyRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// Middleware
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/funds", fundsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/holdings", holdingsRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/ai", aiRoutes);

// Database Connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB Connected");

    startMarketEngine();

    // Every 24hr
    setInterval(cleanupUnverifiedUsers, 24 * 60 * 60 * 1000);
    setInterval(cleanStockHistory, 24 * 60 * 60 * 1000);

    app.listen(PORT, () => {
      console.log("Server running on", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
