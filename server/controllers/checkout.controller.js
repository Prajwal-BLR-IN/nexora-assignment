import Cart from "../models/Cart.model.js";

export const checkout = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        // Fetch cart items with product info
        const cartItems = await Cart.find().populate("product");

        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate total
        const total = cartItems.reduce(
            (acc, item) => acc + item.product.price * item.qty,
            0
        );

        const receipt = {
            name,
            email,
            total,
            items: cartItems.map((item) => ({
                name: item.product.name,
                price: item.product.price,
                qty: item.qty,
            })),
            timestamp: new Date(),
        };

        // Clear cart after checkout 
        await Cart.deleteMany({});

        res.status(200).json({
            message: "Checkout successful",
            receipt,
        });
    } catch (error) {
        res.status(500).json({ message: "Checkout failed", error: error.message });
    }
};
