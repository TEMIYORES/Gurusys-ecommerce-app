import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import connectDB from "./config/connectDB";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
const app = express();

// Config ENV
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware CORS
app.use(cors());

app.use(express.json());

// connect to cloudinary for image upload
cloudinary.config({
  cloud_name: "dlxovrmtr",
  api_key: process.env.CLOUDINARY_SECRET_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

app.use("/api", productRoutes);
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
