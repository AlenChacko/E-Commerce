import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Place Order COD

const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error("Update cart error:", error);
    res.json({ success: false, message: error.message });
  }
};

// Place Order Stripe

const placeOrderStripe = async (req, res) => {};

// Place Order Razorpay

const placeOrderRazorPay = async (req, res) => {};

// Order data for admin

const allOrders = async (req, res) => {};

// Order data for user

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("orders",req.body)
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error while getting orders:", error);
    res.json({ success: false, message: error.message });
  }
};

// update order status from admin side

const updateStatus = async (req, res) => {};

export {
  placeOrderCOD,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrders,
  updateStatus,
};
