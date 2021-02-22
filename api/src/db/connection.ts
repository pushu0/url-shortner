// connection.js
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const db = process.env.MONGO_DB || "localhost"

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

const connection = `mongodb://${db}:27017/url-shortner`;
export const connectDb = () => {
 return mongoose.connect(connection, options);
};

export const disconnectDb = () => {
    return mongoose.connection.close()
}

export default connectDb

