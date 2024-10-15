import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

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


app.use(express.json());

// Server Initialization
app.listen(3000, () => {
    console.log('Server is running on port 3000');
}

);

app.use('/api/user',userRouter);
app.use('/api/auth', authRouter);


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
