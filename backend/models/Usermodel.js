const { model } = require("mongoose");
const { UserSchema } = require("../schemas/UserSchema");

const UserModel = model("users", UserSchema);

module.exports = { UserModel };