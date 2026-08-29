const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, ".env");
require("dotenv").config({ path: envPath });

if (!process.env.MONGO_URI) {
  const legacyUri = fs
    .readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.startsWith("mongodb://") || line.startsWith("mongodb+srv://"));

  if (legacyUri) process.env.MONGO_URI = legacyUri;
}

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing from backend/.env");
}

const app = express();

app.use(cors());
app.use(express.json());

// Import product routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// Import user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Import news routes
const newsRoutes = require('./routes/newsRoutes');
app.use('/api/news', newsRoutes);

// Import review routes
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
