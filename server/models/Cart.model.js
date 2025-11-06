import mongoose from "mongoose";

// Define the schema structure for a cart item
const cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        // 'ref' links this ID to the 'Product' model for population
        ref: "Product",
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        // Sets a default quantity of 1 if none is provided
        default: 1,
    },
});

// This prevents Mongoose from recompiling the model if it already exists (common in hot-reloading envs)
const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;