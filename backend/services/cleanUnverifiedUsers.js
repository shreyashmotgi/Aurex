const { UserModel } = require("../models/Usermodel");
const { Fundsmodel } = require("../models/Fundsmodel");

const cleanupUnverifiedUsers = async () => {
  try {
    const users = await UserModel.find({
      isVerified: false,
      deleteAfter: { $lt: new Date() },
    });

    for (const user of users) {
      await Fundsmodel.deleteOne({
        userId: user._id,
      });

      await UserModel.deleteOne({
        _id: user._id,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = cleanupUnverifiedUsers;