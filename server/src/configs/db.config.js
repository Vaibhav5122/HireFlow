import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb connected✅`);
  } catch (error) {
    console.log(`Error occured during mongodb connection`, error);
  }
}
