import express from "express";
import {
    getCart,
    addToCart,
    removeFromCart,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/", getCart);
cartRouter.post("/", addToCart);
cartRouter.delete("/:id", removeFromCart);

export default cartRouter;
