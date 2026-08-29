const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, ".env");
require("dotenv").config({ path: envPath });

const envFile = fs.existsSync(envPath) ? fs.readFileSync(envPath, "utf8") : "";
const envValues = Object.fromEntries(
  envFile
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/i);
      if (!match) return null;
      return [match[1], match[2].replace(/^['"]|['"]$/g, "")];
    })
    .filter(Boolean)
);

process.env.MONGO_URI ??= process.env.MONGODB_URI ?? envValues.MONGO_URI ?? envValues.MONGODB_URI;

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
