import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Author: {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    },
    Contain: {
        type: String,
        required: true
    },
    Photo:{
        type: String,
    }
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);