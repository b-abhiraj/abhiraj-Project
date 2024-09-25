import express from "express";
import dotenv from 'dotenv';
import connectDb from "./config/db.js";
import morgan from "morgan";
import authRoutes from './routes/authRoute.js'
import cors from 'cors'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoutes.js'

const app = express();
dotenv.config();

connectDb();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes)
app.use('/api/v1/product', productRoutes)

app.get("/", (req, res) => {
    res.send("<h1>Welcome to Ecommerce App</h1>")
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT} in ${process.env.DEV_MODE} mode`);
})