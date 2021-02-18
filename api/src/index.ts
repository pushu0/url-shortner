
import dotenv from 'dotenv';
dotenv.config()

import express from "express";
const app = express();
import connectDb from "./db/connection";
import Url from "./db/models/Url.model"

const PORT = 8080;
app.get("/", (req, res) => {
    res.send("Hello from Node.js app \n");
});
app.get("/urls", async (req, res) => {
    const users = await Url.find();
    res.json(users);
});
app.get("/url-create", async (req, res) => {
    const user = new Url({ url: "urlTest", short:'test1' });
    await user.save().then(() => console.log("User created"));
    res.send("User created \n");
});

app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`);
});

console.log(`Your env var is ${process.env.MONGO_DB}`)

connectDb().then(() => {
    console.log("MongoDb connected");
});
