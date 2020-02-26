const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
// Import routes
const reviewsRoute = require("./routes/Reviews");

// Configure dotenv to be able to access environment variables
dotenv.config();

// Setting up DB connection options
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);

// Connect to Database
mongoose.connect(process.env.CONN_STRING, () => {
    console.log("Connected to DB");
});

// Allow CORS
app.use(cors());

// Middlewares
app.use(express.json());

// Routes middlewares
app.use("/api/reviews", reviewsRoute);

app.listen(5000 || process.env.PORT, () => console.log("Server is running."));
