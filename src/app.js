import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// we gan give limit according to requirment 
// this is use for take json data  
app.use(express.json({ limit: "16kb" }))


// this is use for take data from url nand convert
app.use(express.urlencoded({ extended: true, limit: "16kb" }))


app.use(express.static("public"))

app.use(cookieParser())




export { app }