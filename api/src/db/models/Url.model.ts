import { Schema, model } from "mongoose";
const urlSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    short: {
        type: String,  
        required: true  
        // default: nonoid
    }
});
const Url = model("Url", urlSchema);
export default Url;