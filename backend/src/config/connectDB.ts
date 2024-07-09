import mongoose from "mongoose";
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI)
      await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;
