import mongoose from "mongoose";

const DB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB connected");
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce-app`);
  
};
<<<<<<< HEAD

export default DB;
=======
export default DB;
>>>>>>> 8c945cc (fix mongodb.js react import)
