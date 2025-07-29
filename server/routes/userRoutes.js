const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Add to cart
router.post("/cart/:userId", async (req, res) => {
  const { productId } = req.body;
  await User.findByIdAndUpdate(req.params.userId, { $addToSet: { cart: productId } });
  res.json({ message: "Added to cart" });
});

// Get cart
router.get("/cart/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId).populate("cart");
  res.json(user.cart);
});

// Add to wishlist
router.post("/wishlist/:userId", async (req, res) => {
  const { productId } = req.body;
  await User.findByIdAndUpdate(req.params.userId, { $addToSet: { wishlist: productId } });
  res.json({ message: "Added to wishlist" });
});

// Get wishlist
router.get("/wishlist/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId).populate("wishlist");
  res.json(user.wishlist);
});
