import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import router from './routes/route.js';

const app = express();

//config
dotenv.config();

//DB connection
connectDB();

//middlewaares
app.use(express.json());
app.use(morgan('dev'));
app.use("/api/v1/user",router)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Is Running On PORT ${PORT}`)
})