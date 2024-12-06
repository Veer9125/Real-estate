import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("Connect to MongoDB!");
}).catch((err)=> {
    console.log(err);
})





const app = express();

app.listen(5000, ()=>{
    console.log('server is running successfully on port 5000');
})