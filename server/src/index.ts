import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes';
import connectDB from './configs/db';
import errorHandler from './middlewares/errorMiddleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
// recommended to always use extended: false (more secure and simple parsing)
app.use(express.urlencoded({ extended: false }));
// never forget this cookie parser when protecting routes using cookies
app.use(cookieParser());
app.use(cors());
app.use('/api/users', userRoute);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// this is branch develop
