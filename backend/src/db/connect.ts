import mongoose from "mongoose";

const connectDB = async () => {
  const connectionString: string = process.env.MONGO_URI || ''
  try {
    const conn = await mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: 5000, // Increase the timeout as needed
      socketTimeoutMS: 45000, // Increase the socket timeout as needed
    });
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
