
import dotenv from 'dotenv';
dotenv.config()

import express from "express";
const app = express();
import connectDb from "./db/connection";

const PORT = 8080;
app.get("/", (req, res) => {
    res.send("Hello from Node.js app \n");
});
app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`);
});

console.log(`Your env var is ${process.env.MONGO_DB}`)

connectDb().then(() => {
    console.log("MongoDb connected");
});
