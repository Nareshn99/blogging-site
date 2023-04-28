import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB is connected ${conn.connection.host}`)
    }
    catch (e) {
        console.log(e);
    }
}

export default connectDB;