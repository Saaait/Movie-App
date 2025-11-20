const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const cors = require("cors"); // <-- import cors

connectDb();
const app = express();

// Enable CORS for your frontend
app.use(cors({
    origin: "http://localhost:5173", // allow your frontend origin
    credentials: true, // if you need cookies/auth headers
}));

app.use(express.json());

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// Error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
