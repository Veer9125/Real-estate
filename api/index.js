import express from 'express'

const app = express();

app.listen(5000, ()=>{
    console.log('server is running successfully on port 5000');
})