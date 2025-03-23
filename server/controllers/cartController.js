const Cart = require("../models/cart");
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) cart = new Cart({ user: req.userId, products: [] });

    const existingProduct = cart.products.find((p) => p.product.toString() === productId);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate("products.product");
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: req.userId });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.products = cart.products.filter((p) => p.product.toString() !== productId);

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
