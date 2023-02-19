import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors';

dotenv.config();

connectDB()

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    origin:process.env.ALLOWED.split(" "),
    methods:["GET","PUT","POST","DELETE"]
}))

app.use(express.json())

app.use("/api/products", productRoutes)

app.use('/api/users', userRoutes)

app.use('/api/orders', orderRoutes)

app.use('/api/admin', adminRoutes)

app.get('/api/config/paypal', (req,res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.get("/",(req,res) => res.send("Hello world ecom book server"));

app.use(notFound)

app.use(errorHandler)

app.listen(PORT, console.log(`server running on ${PORT} in ${process.env.NODE_ENV} environment`))