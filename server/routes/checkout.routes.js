import express from "express";
import { checkout } from "../controllers/checkout.controller.js";

const checkoutRouter = express.Router();

checkoutRouter.post("/", checkout);

export default checkoutRouter;
