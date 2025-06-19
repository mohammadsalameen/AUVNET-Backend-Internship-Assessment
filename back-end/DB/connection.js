import mongoose from "mongoose";

const connectDB = async() => {
    return await mongoose.connect(process.env.DB)
    .then(() => console.log("database connection established"))
    .catch((error) => console.log(`error to connect with database :  ${error}`))
};
export default connectDB;
