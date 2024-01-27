import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {
        type: String,
        // required: true,
        // unique: true
    },
    email: {
        type: String,
    },
    pswd: {
        type: String,
        // required: true
    }
});

export default mongoose.model.Blogs || mongoose.model("Blog", schema);