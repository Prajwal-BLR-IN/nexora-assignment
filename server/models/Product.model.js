import mongoose from "mongoose";

// Define the schema structure for a product item
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
});

// This prevents Mongoose from recompiling the model if it already exists (common in hot-reloading envs)
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
