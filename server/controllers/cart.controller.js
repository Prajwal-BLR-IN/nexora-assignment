import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";

// @desc Get all items in the cart
// @route GET /api/cart
export const getCart = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate("product");
        const total = cartItems.reduce(
            (acc, item) => acc + item.product.price * item.qty,
            0
        );

        res.json({ cartItems, total });
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error });
    }
};

// @desc Add product to cart
// @route POST /api/cart
export const addToCart = async (req, res) => {
    try {
        const { productId, qty } = req.body;
        const product = await Product.findById(productId);

        if (!product) return res.status(404).json({ message: "Product not found" });

        const existing = await Cart.findOne({ product: productId });

        if (existing) {
            existing.qty += qty || 1;
            await existing.save();
            return res.json({ message: "Cart updated", cartItem: existing });
        }

        const newItem = new Cart({ product: productId, qty });
        await newItem.save();

        res.status(201).json({ message: "Added to cart", cartItem: newItem });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error });
    }
};

// @desc Remove product from cart
// @route DELETE /api/cart/:id
export const removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        await Cart.findByIdAndDelete(id);
        res.json({ message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Error removing from cart", error });
    }
};
