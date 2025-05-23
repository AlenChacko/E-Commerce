import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cartControllers.js";
import userAuth from "../middlewares/userAuth.js";

const cartRouter = express.Router();

cartRouter.post("/get", userAuth, getUserCart);
cartRouter.post("/add", userAuth, addToCart);
cartRouter.post("/update", userAuth, updateCart);

export default cartRouter;
