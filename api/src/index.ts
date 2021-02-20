
import dotenv from 'dotenv';
dotenv.config()

import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser'
const app = express();
app.use(cors());
app.use(bodyParser.json())
import connectDb from "./db/connection";
import Url from "./db/models/Url.model"
import generateId from "./db/utils/generateId"

const uniqueId = async (): Promise<string> => {
    const id = generateId()
    const isExistingId = await Url.exists({ short: id })
    if (isExistingId) {
        return await uniqueId()
    }
    return id
}

const PORT = process.env.DEFAULT_PORT || 8080;

app.get("/", (req, res) => {
    res.send("Hello from Node.js app \n");
});
app.get("/urls", async (req, res) => {
    const users = await Url.find().sort({'timestamp': 'desc'});
    res.json(users);
});

app.post("/url-create", async (req, res) => {
    const { url } = req.body

    if (!url) res.status(422).json('Wrong request body')

    let urlModel = await Url.findOne({ url }).exec();

    if (!urlModel) {
        const prettyId = await uniqueId()
        urlModel = new Url({
            url: url,
            id: prettyId
        });
        await urlModel.save().then(() => console.log("Url created"));
    }

    res.status(200).send(urlModel);
});


console.log(`Your env var is ${process.env.MONGO_DB}`)

connectDb().then(() => {
    console.log("MongoDb connected");
    app.listen(PORT, function () {
        console.log(`Listening on ${PORT}`);
    });
});
