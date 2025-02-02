import express from "express";
import connectDB from "./db/connect.js";
import todoRoutes from "./routes/todoRoutes.js";
import logger from "./middleware/logger.js";
import dotenv from "dotenv";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
dotenv.config();
const app = express();
const port = parseInt(process.env.PORT) || 5000;
connectDB();
app.use(cors({
    origin: 'https://kanban-redux-tk-typescript.vercel.app',
    credentials: true,
    methods: ['DELETE', 'PUT', 'GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://kanban-redux-tk-typescript.vercel.app');
    next();
});
// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// logger middleware
app.use(logger);
// cookie parser middleware
app.use(cookieParser());
// Routes
app.use("/users", userRoutes);
app.use("/todos", todoRoutes);
// Error handling middleware
app.use(notFound);
app.use(errorHandler);
// Listen
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
