// connection.js
import mongoose from "mongoose";
import Url from "./models/Url.model";

const connection = "mongodb://database:27017/url-shortner";
const connectDb = () => {
 return mongoose.connect(connection);
};

export default connectDb

