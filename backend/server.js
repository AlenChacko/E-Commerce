import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";


dotenv.config();
connectDB()
connectCloudinary()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use('/api/user',userRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
