import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();
dotenv.config();

const connect=async ()=>{
    try {
      await  mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDb");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("MongoDb Disconnected");
})


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)


app.listen(8300,()=>{
    connect()
    console.log("connected to backend");
})

