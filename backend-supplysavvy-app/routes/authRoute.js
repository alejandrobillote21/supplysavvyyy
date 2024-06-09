const express = require('express');
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
} = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// User registration and login routes
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);

// Password management routes
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/password", authMiddleware, updatePassword);

// Refresh token and logout routes
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);

// User management routes
router.get("/all-users", authMiddleware, isAdmin, getallUser);
/*router.get("/:id", authMiddleware, isAdmin, getaUser);*/
router.get('/user/:id', getaUser);
router.delete("/:id", authMiddleware, isAdmin, deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);

// User wishlist route
router.get("/wishlist", authMiddleware, getWishlist);

// Uncomment these routes as needed
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.get("/get-orders", authMiddleware, getOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.post("/getorderbyuser/:id", authMiddleware, isAdmin, getAllOrders);
router.get("/cart", authMiddleware, getUserCart);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus);
router.put("/save-address", authMiddleware, saveAddress);

module.exports = router;
