const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("🏗️ HouseFrame Backend Running");
});

// Database Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/houseframe";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("💾 MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failure:");
    console.error(err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
