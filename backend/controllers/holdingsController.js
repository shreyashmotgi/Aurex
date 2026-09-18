const {getUserHoldings}=require("../services/holdingsService");

// ---------------- Get Holdings ----------------

const getHoldings = async (req, res) => {
  try {
    const holdings = await getUserHoldings(
      req.user.id
    );

    res.status(200).json({
      success: true,
      holdings,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getHoldings,
};