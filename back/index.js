import express from "express"
import cookieParser  from "cookie-parser"
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js"
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctors.js';
import reviewRoute from'./Routes/review.js';
// import bookingRoute from './Routes/booking.js';
dotenv.config()

const app=express()
const port =process.env.PORT|| 5000
const corsOptions={
    origin : "*",
}
app.get('/',(req,res)=>{
    res.send("Api is working")
})

mongoose.set("strictQuery",false)

const connectDB= async()=>{
    try{
       await  mongoose.connect("mongodb+srv://abhishekranjan7390:root@cluster0.4ajue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("MongoDB connected")
    }
    catch(error){
        console.log("Mongoose is not connect")
        console.log(error)
    }
}

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth',authRoute)  //domain for register and login api 
app.use('/api/v1/users',userRoute)
app.use('/api/v1/doctors',doctorRoute);
app.use('/api/v1/reviews',reviewRoute);
// app.use("/api/v1/bookings",bookingRoute)
app.listen(port ,()=>{
    connectDB();
    console.log(`Server is running at ${port}`)
})
