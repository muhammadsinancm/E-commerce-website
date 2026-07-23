import mongoose from "mongoose";

export const DB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB connected");
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce-app`);
  
};
