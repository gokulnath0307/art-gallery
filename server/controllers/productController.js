const order = require("../models/order");
const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      user: req.user._id,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("user", "name email");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const products = await Product.find({ _id: req.params.id });
    res.status(200).json(products[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductsByUser = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, user: req.user._id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updatedData = { ...req.body, image: req.body.image ? req.body.image : product.image };

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId, user: req.user._id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    const existingOrder = await order.findOne({ "products.product": productId });
    if (existingOrder) {
      return res.status(400).json({ message: "This product has been purchased and cannot be deleted." });
    }
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
