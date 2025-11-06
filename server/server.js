import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/connect.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import checkoutRouter from "./routes/checkout.routes.js";

const app = express();

// Middlewares
app.use(cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"]
}));
app.use(express.json());

// connect to Database
connectDB();

// Routes
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("api/checkout", checkoutRouter)

// Root test route
app.get("/", (req, res) => {
    res.send("Nexora Backend API Running...");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
