const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    allowedHeaders: ["Content-Type"],
}));

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));