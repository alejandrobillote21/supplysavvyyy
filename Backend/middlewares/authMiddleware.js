const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Middleware to verify the token and attach user to req object
const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
      }
    } catch (error) {
      console.error("Authorization error:", error.message);
      return res.status(401).json({ message: "Not Authorized, token expired. Please login again." });
    }
  } else {
    return res.status(401).json({ message: "No token attached to header" });
  }
});

// Middleware to check if the user is an admin
const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (!adminUser || adminUser.role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }
  next();
});

// Middleware to check if the user is a customer
const isCustomer = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const customerUser = await User.findOne({ email });
  if (!customerUser || customerUser.role !== "customer") {
    return res.status(403).json({ message: "You are not a customer" });
  }
  next();
});

module.exports = { authMiddleware, isAdmin, isCustomer };
