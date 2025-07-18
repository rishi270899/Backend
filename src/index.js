import dotenv from 'dotenv';
import connectDB from "./database/connectDB.js";
import { app } from './app.js';

const port = process.env.PORT || 8000;


dotenv.config({ path: "./env" })


connectDB()
    .then(
        () => {
            app.listen(port, () => {
                console.log(`Server is runnig at port : ${port}`);

            })
        }
    )
    .catch(
        (err) => {
            console.log(`MongoDB connnection failed !!!`, err);

        }
    )
