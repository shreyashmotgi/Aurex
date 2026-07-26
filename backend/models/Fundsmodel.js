const mongoose = require("mongoose");

const { FundsSchema } = require("../schemas/FundsSchema");

const Fundsmodel = mongoose.model("Funds", FundsSchema);

module.exports = { Fundsmodel };