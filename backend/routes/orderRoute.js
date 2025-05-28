import express from "express";
import {
  placeOrderCOD,
  placeOrderStripe,
  placeOrderRazorPay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
} from "../controllers/orderControlers.js";

import adminAuth from "../middlewares/adminAuth.js";
import userAuth from "../middlewares/userAuth.js";

const orderRouter = express.Router();

orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

orderRouter.post("/place", userAuth, placeOrderCOD);
orderRouter.post("/stripe", userAuth, placeOrderStripe);
orderRouter.post("/razorpay", userAuth, placeOrderRazorPay);

orderRouter.post("/userorders", userAuth, userOrders);

orderRouter.post('/verifyStripe',userAuth,verifyStripe)
orderRouter.post('/verifyRazorpay',userAuth,verifyRazorpay)


export default orderRouter;
