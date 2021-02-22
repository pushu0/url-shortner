import { Schema, model, Document } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const prefix = process.env.URL_PREFIX || "pbid.io";

export interface UrlModel extends Document {
  url: string;
  id: string;
  short: string;
  timestamp: string;
}

const schema = new Schema({
  url: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  short: {
    type: String,
    default: function () {
      return `https://${prefix}/${this.id}`;
    }
  },
  timestamp: {
    type: String,
    default: function () {
      return new Date().toISOString();
    }
  }
});

schema.path("url").validate((val: string) => {
  const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, "Invalid URL.");

const Url = model<UrlModel>("Url", schema);
export default Url;
