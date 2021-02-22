import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import generateId from "../db/utils/generateId";
import Url from "../db/models/Url.model";

const uniqueId = async (): Promise<string> => {
  const id = generateId();
  const isExistingId = await Url.exists({ short: id });
  if (isExistingId) {
    return await uniqueId();
  }
  return id;
};

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/urls", async (req, res) => {
  try {
    const users = await Url.find().sort({ timestamp: "desc" });
    res.status(200).json(users);
  } catch (e) {
    throw new Error(e);
  }
});

app.post("/url-create", async (req, res) => {
  const { url } = req.body;

  if (!url) res.status(422).json("Wrong request body");

  try {
    let urlModel = await Url.findOne({ url });

    if (!urlModel) {
      const prettyId = await uniqueId();
      urlModel = new Url({
        url: url,
        id: prettyId
      });
      await urlModel.save()
    }

    res.status(200).send(urlModel);
  } catch (e) {
    throw new Error(e);
  }
});

export default  app;

module.exports = app;
