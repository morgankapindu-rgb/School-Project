import express from "express"
import cors from "cors"
import { connectDb } from './config/db.js';
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'




//app config
const app = express()
const port = 4000

//middleware
app.use(express.json())
app.use(cors())

//db connection

connectDb();

//api endpoints
app.use("/api/food", foodRouter)

app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("API Working")
})
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})

//mongodb+srv://savagelondi123:<db_password>@cluster0.bzjpn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0