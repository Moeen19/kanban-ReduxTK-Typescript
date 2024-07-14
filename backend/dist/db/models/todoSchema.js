import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    user: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isDone: Boolean,
});
export default mongoose.model("Todo", todoSchema);
