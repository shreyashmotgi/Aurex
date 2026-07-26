const { UserModel } = require("../models/Usermodel");
const { Fundsmodel } = require("../models/Fundsmodel");
const { OAuth2Client } = require("google-auth-library");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ---------------- Google Login ----------------

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential missing",
      });
    }

    // Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub, email, name, picture, email_verified } = payload;

    // Find existing user
    let user = await UserModel.findOne({ email });

    // New Google User
    if (!user) {
      const username = email.split("@")[0] + Math.floor(Math.random() * 1000);

      user = await UserModel.create({
        fullName: name,
        username,
        email,
        password: bcrypt.hashSync(Math.random().toString(36), 12), // dummy password
        googleId: sub,
        provider: "google",
        isVerified: email_verified,
      });

      // Create Funds Account
      await Fundsmodel.create({
        userId: user._id,
      });
    }

    // Existing local account → connect Google account
    else if (!user.googleId) {
      user.googleId = sub;
      user.isVerified = email_verified;

      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      message: "Google Login Successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        picture,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message || "Google Login Failed",
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await UserModel.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification link",
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;

    await user.save();

    return res.redirect(`${process.env.FRONTEND_URL}/email-verified`);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find user
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email.",
      });
    }

    // Google account
    if (user.provider === "google") {
      return res.status(400).json({
        success: false,
        message: "This account uses Google Sign In. Please login with Google.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;

    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Reset your password",

      html: `
        <h2>Password Reset</h2>

        <p>You requested to reset your password.</p>

        <p>This link is valid for <b>10 minutes</b>.</p>

        <a
          href="${resetLink}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#387ed1;
            color:white;
            text-decoration:none;
            border-radius:5px;
          "
        >
          Reset Password
        </a>

        <p>If you didn't request this, ignore this email.</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email.",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // Find user with valid token
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset link.",
      });
    }

    // Update password
    user.password = password;

    // Clear reset token
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. Please login.",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ---------------- Signup ----------------

const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    // Validate Fields
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Existing Email
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create User
    const newUser = await UserModel.create({
      fullName,
      username,
      email,
      password,
    });

    // Create Funds Account
    await Fundsmodel.create({
      userId: newUser._id,
    });

    // Generate Verification Token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    newUser.verificationToken = verificationToken;

    // 10 Minutes
    newUser.verificationTokenExpires = Date.now() + 10 * 60 * 1000;

    // Used later for auto cleanup
    newUser.deleteAfter = Date.now() + 10 * 60 * 1000;

    await newUser.save();

    // Verification Link
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
    try {
      await sendEmail({
        to: newUser.email,
        subject: "Welcome to Aurex — Verify Your Email",

        html: `
<div style="font-family: Arial, Helvetica, sans-serif; max-width:600px; margin:auto; padding:30px; background:#ffffff; border:1px solid #e5e7eb; border-radius:12px;">

  <div style="text-align:center; margin-bottom:30px;">
    <h1 style="margin:0; color:#0B1220; font-size:32px;">
      Aurex
    </h1>
    <p style="color:#6b7280; margin-top:8px;">
      Rise Above the Market
    </p>
  </div>

  <h2 style="color:#0B1220;">
    Welcome, ${newUser.fullName} 👋
  </h2>

  <p style="color:#4b5563; line-height:1.8;">
    Thank you for creating your Aurex account.
  </p>

  <p style="color:#4b5563; line-height:1.8;">
    Please verify your email address to activate your account and start exploring stocks, portfolios, watchlists, and market insights.
  </p>

  <div style="text-align:center; margin:35px 0;">
    <a
      href="${verificationLink}"
      style="
        display:inline-block;
        background:#D4AF37;
        color:#0B1220;
        padding:14px 30px;
        text-decoration:none;
        font-weight:bold;
        border-radius:8px;
      "
    >
      Verify Email
    </a>
  </div>

  <p style="color:#6b7280;">
    This verification link will expire in
    <strong>10 minutes</strong>.
  </p>

  <hr style="margin:30px 0; border:none; border-top:1px solid #e5e7eb;">

  <p style="font-size:14px; color:#9ca3af;">
    If you didn't create an Aurex account, you can safely ignore this email.
  </p>

  <p style="font-size:13px; color:#9ca3af; margin-top:30px;">
    © 2026 Aurex. All Rights Reserved.
  </p>

</div>
`,
      });
    } catch (emailError) {
      // Rollback if email couldn't be sent

      await Fundsmodel.deleteOne({
        userId: newUser._id,
      });

      await newUser.deleteOne();

      return res.status(500).json({
        success: false,
        message: "Unable to send verification email. Please try again.",
      });
    }

    return res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email within 10 minutes before logging in.",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ---------------- Login ----------------

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Find user

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // Compare Password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // Generate JWT

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  signup,
  login,
  verifyEmail,
  googleLogin,
  forgotPassword,
  resetPassword,
};
