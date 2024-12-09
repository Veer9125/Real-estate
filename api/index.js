import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

dotenv.config();
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("Connect to MongoDB!");
}).catch((err)=> {
    console.log(err);
})





const app = express();

app.use(express.json());

app.listen(5000, ()=>{
    console.log('server is running successfully on port 5000');
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 550;
    const message = err.message || 'Internal server error';
    return res.json({
        success: false,
        statusCode,
        message,
    })
})