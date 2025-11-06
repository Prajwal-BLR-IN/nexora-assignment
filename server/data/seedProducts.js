// this function is used only once to insert products into a database

import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../db/connect.js";
import Product from "../models/Product.model.js";

dotenv.config();

const seedProducts = async () => {
    await connectDB();
    const { data } = await axios.get("https://fakestoreapi.com/products");
    const formatted = data.slice(0, 10).map(item => ({
        name: item.title,
        price: item.price,
        image: item.image,
    }));
    await Product.deleteMany({});
    await Product.insertMany(formatted);
    console.log("Products seeded");
    mongoose.connection.close();
};

seedProducts();
