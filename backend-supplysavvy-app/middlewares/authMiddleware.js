const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

/*const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);
                req.user = user;
                next();
            }
        } catch (error) {
            throw new Error("Not Authorized token expired, Please login again")
        }
    } else {
        throw new Error("There is no token attached to header");
    }
});
const isAdmin = asyncHandler(async (req, res, next) => {
    console.log(req.user);
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.role !== "admin"){
        throw new Error("You are not an admin")
    } else {
        next();
    }
});*/

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
  
  const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ message: "You are not an admin" });
    }
    next();
  });
  

module.exports = { authMiddleware, isAdmin };
