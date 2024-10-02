import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Database Connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB !');
})
.catch((err) => {
    console.log(err);
})
// Server Initialization
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
