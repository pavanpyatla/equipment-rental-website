const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const rentalRoutes = require("./routes/rentals");


const authRoutes = require("./routes/auth");

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Database connection */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB error:", err));

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/admin", require("./routes/admin"));


/* Server */
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
