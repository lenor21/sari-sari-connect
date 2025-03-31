import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error('MONGO_URI environment variable is not defined.');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI as string);
    console.log(`MongoDB is connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
