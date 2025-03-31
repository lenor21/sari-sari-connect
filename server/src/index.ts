import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes';
import connectDB from './configs/db';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5001;

app.use('/api/users', userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
