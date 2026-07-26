const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      default: null,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    verificationToken: {
      type: String,
      default: null,
    },

    verificationTokenExpires: {
      type: Date,
      default: null,
    },
    resetPasswordToken: {
  type: String,
  default: null,
},

resetPasswordExpires: {
  type: Date,
  default: null,
},
    deleteAfter: {
      type: Date,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

UserSchema.pre("save", async function (next) {
  // Hash only if password changed
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

module.exports = { UserSchema };
