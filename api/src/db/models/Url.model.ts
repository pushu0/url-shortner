import { Schema, model, Document } from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const prefix = process.env.URL_PREFIX || 'pbid.io'

interface IUrl extends Document{
    url: string,
    id: string,
    short: string
}

const urlSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    }
});

urlSchema.virtual('short').get(function() {
    const url = new URL(this.url)
    return `${url.protocol}//${prefix}/${this.id}`
});

urlSchema.path('url').validate((val: string) => {
    const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

const Url = model<IUrl>("Url", urlSchema);
export default Url;