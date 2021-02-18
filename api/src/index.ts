
import dotenv from 'dotenv';
dotenv.config()

import express from "express";
const app = express();
import connectDb from "./db/connection";
import Url from "./db/models/Url.model"
import generateId from "./db/utils/generateId"

const uniqueId = async ():Promise<string> => {
    const id = generateId()
    const isExistingId = await Url.exists({short: id})
    if(isExistingId) {
        return await uniqueId()
    }
    return id
}

const PORT = 8080;
app.get("/", (req, res) => {
    res.send("Hello from Node.js app \n");
});
app.get("/urls", async (req, res) => {
    const users = await Url.find();
    res.json(users);
});
app.get("/url-create", async (req, res) => {
    const prettyId = await uniqueId()    

    const user = new Url({ url: "https://urlTest.com", id: prettyId});
    console.log(prettyId)
    await user.save().then(() => console.log("User created"));
    res.send({        
        short: user.short,
        message: "User created \n"
    });
});

app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`);
});

console.log(`Your env var is ${process.env.MONGO_DB}`)

connectDb().then(() => {
    console.log("MongoDb connected");
});
