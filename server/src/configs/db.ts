import mongoose from 'mongoose';

type NodeEnvironment = 'development' | 'production';

const connectDB = async () => {
  try {
    // add configuration with a two values
    const config = {
      development: {
        mongoURI: process.env.MONGO_URI_DEV as string,
      },
      production: {
        mongoURI: process.env.MONGO_URI_PROD as string,
      },
    };

    // select based on the current environment
    const nodeEnv = process.env.NODE_ENV as NodeEnvironment;

    const uri = config[nodeEnv].mongoURI;

    // connect to the database
    const conn = await mongoose.connect(uri);

    console.log(`MongoDB is connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
