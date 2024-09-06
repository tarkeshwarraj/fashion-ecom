import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productModel from './models/productScheme.js';
import productRouter from "./routes/productRoute.js"
import bannerRouter from './routes/bannerRoute.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();

const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
// app.use(body.Parser.json());
app.use(express.json());

//config folder sa Mongo Db connection aa raha hai
connectDB();


app.use("/api/product", productRouter);
app.use("/api/banner/", bannerRouter);
app.use("/api/slider_banner", bannerRouter);

// Serve static files from the 'banners' directory
app.use('/banners', express.static('banners'));
app.use('/uploads', express.static('uploads'));

//user router
app.use("/api/user", userRouter);

//Cart Router
app.use("/api/cart", cartRouter);

//order router
app.use("/api/order",orderRouter);


app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})








//YX2VWkqQnEFVPGex 