import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();




// Database Connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB !');
})
.catch((err) => {
    console.log(err);
});

// Server Initialization
app.listen(3000, () => {
    console.log('Server is running on port 3000');
}

);


app.use(cors());
    


app.use(express.json());
app.use(cookieParser());


app.use('/api/user',userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


//middleware to handle errors globally
app.use((err, req , res, next )=> {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
