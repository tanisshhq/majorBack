const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow cookies & auth headers
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.use("/api/items", require("./routes/items"));
app.use("/api/payment", require("./routes/payment"));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
