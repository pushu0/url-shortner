import { Schema, model } from "mongoose";
const urlSchema = new Schema({
 url: {
 type: String
 }
});
const Url = model("Url", urlSchema);
export default Url;