import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

import Product from "./models/productModels.js";
import products from "./data/product.js";
import connectDB from "./config/db.js";

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Data Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeder Error:", error);
    process.exit(1);
  }
};

importData();
