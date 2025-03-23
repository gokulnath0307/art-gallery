const express = require("express");
const { placeOrder, getOrders } = require("../controllers/orderController");
const { authenticate } = require("../middleware/authMiddleware");

const OrderRouter = express.Router();

OrderRouter.post("/checkout", authenticate, placeOrder);
OrderRouter.get("/history", authenticate, getOrders);

module.exports = OrderRouter;
