import dotenv from "dotenv";
dotenv.config();

import app from "./server/index";

import connectDb from "./db/connection";

const PORT = process.env.DEFAULT_PORT || 8080;

connectDb().then(() => {
  console.log("MongoDb connected");
  app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`);
  });
});
