const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    medium: { type: String, required: true },
    style: { type: String, required: true },
    weight: { type: String, required: true },
    dimensions: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // Image file path
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
