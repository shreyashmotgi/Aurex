const express = require("express");

const router = express.Router();

const {
  signup,
  login,
  googleLogin,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

router.post("/signup", signup);

router.get("/verify-email/:token", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.post("/login", login);

router.post("/google-login", googleLogin);

module.exports = router;
