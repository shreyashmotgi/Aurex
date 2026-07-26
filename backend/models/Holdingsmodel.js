const mongoose = require("mongoose");

const { HoldingsSchema } = require("../schemas/HoldingsSchema");

const Holdingsmodel = mongoose.model("Holdings", HoldingsSchema);

module.exports = { Holdingsmodel };