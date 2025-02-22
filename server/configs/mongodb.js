import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("conected",()=>{
        console.log("Mongodb connected")
    })
    await mongoose.connect(`${process.env.MONGO_URL}/lms`);

};

export default connectDB;
