import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema({
    blogimg: {
        type: String,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    }
});

export default mongoose.model.Blog1s || mongoose.model("Blog1", schema);  