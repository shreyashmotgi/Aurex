const {Fundsmodel} = require("../models/Fundsmodel");

const getFunds = async (req, res) => {
  try {
    const funds = await Fundsmodel.findOne({
      userId: req.user.id,
    });

    if (!funds) {
      return res.status(404).json({
        success: false,
        message: "Funds not found",
      });
    }

    res.status(200).json({
      success: true,
      funds,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getFunds,
};