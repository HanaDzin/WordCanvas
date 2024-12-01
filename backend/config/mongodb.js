import mongoose from "mongoose";

const connectDB = async (params) => {
  mongoose.connection.on("connected", () => {
    console.log("Connected to database!");
  });
  await mongoose.connect(`${process.env.MONGO_URI}/wordcanvas`);
};

export default connectDB;
