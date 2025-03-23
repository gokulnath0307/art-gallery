const Cart = require("../models/cart");
const Order = require("../models/order");

exports.placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate("products.product");
    if (!cart || cart.products.length === 0) return res.status(400).json({ error: "Cart is empty" });

    const totalAmount = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const order = new Order({
      user: req.userId,
      products: cart.products,
      totalAmount,
    });

    await order.save();
    await Cart.deleteOne({ user: req.userId }); // Clear cart after purchase

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate("products.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
