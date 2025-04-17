require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const destinationRoutes = require("./routes/destination.route");

// const mongoDB = "mongodb+srv://root:root@cluster0.spmcifx.mongodb.net/ctse";
const mongoDB = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(mongoDB)
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// User routes
app.use("/destinations", destinationRoutes);

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
