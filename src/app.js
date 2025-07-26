import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// we gan give limit according to requirment 
// this is use for take json data  
app.use(express.json())
// app.use(express.json({ limit: "16kb" }))


// this is use for take data from url nand convert
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

// body parser
// app.use(bodyParser.json())
// app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(express.static("public"))

app.use(cookieParser())


// routes imports

import userRouter from './routes/user.routes.js';



// routes declaration  /api/v1 -> for company standard
app.use('/api/v1/user', userRouter)



export { app }