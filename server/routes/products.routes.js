import express from "express";
import { getProducts } from "../controllers/products.controller.js";

const productRouter = express.Router();

// GET /api/products
productRouter.get("/", getProducts);

export default productRouter;
