import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import wishlistRoutes from "./routes/wishlist.js";
import orderRoutes from "./routes/order.js";
import fs from "fs";
import Category from "./models/Category.js";
import Product from "./models/Product.js"; // For seeding products

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/TestData")
  .then(async () => {
    console.log("Connected to MongoDB");
    
    // Seed requested categories
    const categoriesToSeed = [
      { name: "Grocery", description: "Daily essentials and food items" },
      { name: "Clothes", description: "Men and Women apparel and fashion" },
      { name: "Electronics", description: "Gadgets, phones, laptops, and more" },
      { name: "Perfumes", description: "Fragrances and body sprays" },
      { name: "Watches", description: "Analog, digital, and smart watches" },
      { name: "Shoes", description: "Footwear for all occasions" }
    ];

    for (const cat of categoriesToSeed) {
      const exists = await Category.findOne({ name: { $regex: new RegExp(`^${cat.name}$`, "i") } });
      if (!exists) {
        await Category.create(cat);
        console.log(`Seeded category: ${cat.name}`);
      }
    }

    // --- SEED 20 PRODUCTS ---
    const productCount = await Product.countDocuments();
    if (productCount < 10) {
      const categories = await Category.find({});
      const catMap = {};
      categories.forEach(c => catMap[c.name.toLowerCase()] = c._id);

      const productsToSeed = [
        { name: "Organic Apples", price: 150, description: "Fresh organic apples from the farm.", brand: "FarmFresh", countInStock: 50, category: catMap['grocery'] },
        { name: "Whole Wheat Bread", price: 60, description: "Healthy whole wheat bread baked daily.", brand: "Bakersville", countInStock: 30, category: catMap['grocery'] },
        { name: "Fresh Milk 1L", price: 80, description: "Pure cow milk rich in calcium.", brand: "DairyPure", countInStock: 100, category: catMap['grocery'] },
        { name: "Himalayan Pink Salt", price: 120, description: "Natural rock salt for a healthy diet.", brand: "NatureBest", countInStock: 40, category: catMap['grocery'] },
        { name: "Men's Cotton T-Shirt", price: 599, description: "Comfortable everyday wear 100% cotton.", brand: "UrbanTee", countInStock: 60, category: catMap['clothes'] },
        { name: "Women's Summer Dress", price: 1299, description: "Lightweight and stylish floral dress.", brand: "ChicStyle", countInStock: 25, category: catMap['clothes'] },
        { name: "Denim Jeans", price: 1599, description: "Classic fit blue denim jeans.", brand: "DenimCo", countInStock: 45, category: catMap['clothes'] },
        { name: "Winter Wool Jacket", price: 2499, description: "Keep warm with this premium wool jacket.", brand: "WinterWear", countInStock: 15, category: catMap['clothes'] },
        { name: "Wireless Headphones", price: 3999, description: "Noise-cancelling over-ear headphones.", brand: "AudioBeat", countInStock: 20, category: catMap['electronics'] },
        { name: "Smartphone Pro Max", price: 75000, description: "Latest flagship with incredible camera.", brand: "TechGiant", countInStock: 10, category: catMap['electronics'] },
        { name: "4K Ultra HD Smart TV", price: 45000, description: "Crystal clear picture with smart features.", brand: "VisionPlus", countInStock: 5, category: catMap['electronics'] },
        { name: "Mechanical Keyboard", price: 2999, description: "RGB backlit tactile gaming keyboard.", brand: "GamerGear", countInStock: 35, category: catMap['electronics'] },
        { name: "Ocean Breeze Parfum", price: 1899, description: "Refreshing aquatic fragrance.", brand: "ScentLife", countInStock: 40, category: catMap['perfumes'] },
        { name: "Midnight Musk Cologne", price: 2100, description: "Deep and alluring scent for evening wear.", brand: "AromaCo", countInStock: 30, category: catMap['perfumes'] },
        { name: "Floral Spring Perfume", price: 1650, description: "Sweet floral notes perfect for spring.", brand: "ScentLife", countInStock: 25, category: catMap['perfumes'] },
        { name: "Classic Leather Watch", price: 3499, description: "Elegant analog watch with brown leather strap.", brand: "TimeKeeper", countInStock: 20, category: catMap['watches'] },
        { name: "Steel Chronograph", price: 5999, description: "Premium stainless steel sports watch.", brand: "LuxTime", countInStock: 12, category: catMap['watches'] },
        { name: "Fitness Smart Tracker", price: 2499, description: "Track steps, heart rate, and sleep.", brand: "FitTech", countInStock: 50, category: catMap['watches'] },
        { name: "Running Sneakers", price: 2999, description: "Lightweight and breathable running shoes.", brand: "RunFast", countInStock: 40, category: catMap['shoes'] },
        { name: "Formal Leather Loafers", price: 3599, description: "Classic black leather loafers for office wear.", brand: "Elegance", countInStock: 20, category: catMap['shoes'] }
      ];

      // Add dummy imageUrls
      const seeded = productsToSeed.map(p => ({
        ...p,
        imageUrl: `https://source.unsplash.com/400x400/?${p.category ? p.name.split(' ')[0] : 'product'}`,
        rating: 4.5,
        numReviews: Math.floor(Math.random() * 50) + 5
      }));

      await Product.insertMany(seeded);
      console.log("Successfully seeded 20 products!");
    }
  })
  .catch((err) => console.error("MongoDB connection error:", err));


const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) callback(null, true);
      else callback(new Error("CORS policy: Origin not allowed"));
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

import categoryRoutes from "./routes/categories.js";
import reviewRoutes from "./routes/reviews.js";
import couponRoutes from "./routes/coupons.js";
import addressRoutes from "./routes/addresses.js";

// mount modular routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/addresses", addressRoutes);

app.get("/", (req, res) => res.send("Home Page"));

// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Global error handler caught:", err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Server restart v11 - seed products
