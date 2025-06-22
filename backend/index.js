const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

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
