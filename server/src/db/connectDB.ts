import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING as string);
    console.log("db connected");
  } catch (err: any) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  }
};

export { connectDB };
