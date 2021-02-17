// connection.js
import mongoose from "mongoose";
import Url from "./models/Url.model";

const connection = "mongodb://localhost:27017/url-shortner";
const connectDb = () => {
 return mongoose.connect(connection);
};

export default connectDb