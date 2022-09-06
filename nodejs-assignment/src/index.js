import express from 'express';
import mongoose from "mongoose"
import dotenv from "dotenv";
import postrouter from './routes/postroutes.js';
import commentrouter from "./routes/commentroutes.js"



// initilize app
const app = express();
app.use(express.json());
dotenv.config();


// all used routes
app.use("/post",postrouter)
app.use("/comment",commentrouter)


// conected to database
const connect=()=>{
    mongoose.connect(process.env.MONGO_DB||"mongodb+srv://socialmedia:social123@cluster0.w47dk.mongodb.net/happycredit?retryWrites=true&w=majority")
    .then(()=>{
        console.log("connected to database")
    })
    .catch(err=>{
        console.log(err.message)
    })
}



// created a server
const port =process.env.PORT || 8080
app.listen(port,()=>{
    connect()
    console.log(`listening on port ${port}`);
});