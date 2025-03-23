const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const Router = require("./routes/routes");
const app = express();
connectDB();

// Middleware
app.use(cors({origin:['http://localhost:5173']}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", Router);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
