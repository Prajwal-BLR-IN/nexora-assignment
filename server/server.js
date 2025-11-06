import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/connect.js";

const app = express();

// Middlewares
app.use(cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173"]
}));
app.use(express.json());

// Routes

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
