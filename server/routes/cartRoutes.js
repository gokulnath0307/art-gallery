const express = require("express");
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");
const { authenticate } = require("../middleware/authMiddleware");

const CartRouter = express.Router();

CartRouter.post("/add", authenticate, addToCart);
CartRouter.get("/", authenticate, getCart);
CartRouter.delete("/remove", authenticate, removeFromCart);

module.exports = CartRouter;
